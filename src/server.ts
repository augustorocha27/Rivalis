import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const NODE_ENV = process.env.NODE_ENV || 'development';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_nao_use_em_prod';
const HMAC_SECRET = process.env.HMAC_SECRET || 'rivalis_hmac_secret_2026';

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'SECURITY_ALERT';

const structuredLog = (
  level: LogLevel,
  event: string,
  message: string,
  metadata: Record = {}
) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: 'rivalis-security-api',
    environment: NODE_ENV,
    event,
    message,
    trace_id: crypto.randomUUID(),
    ...metadata,
  };
  console.log(JSON.stringify(logEntry));
};

const requireHttpsInProduction = (req: Request, res: Response, next: NextFunction) => {
  const proto = req.headers['x-forwarded-proto'];
  if (NODE_ENV === 'production' && proto && proto !== 'https') {
    structuredLog('SECURITY_ALERT', 'INSECURE_TRANSPORT_BLOCKED', 'Tentativa de acesso via HTTP em produção', {
      ip: req.ip,
      path: req.originalUrl,
    });
    return res.status(403).json({
      error: 'HTTPS_REQUIRED',
      message: 'Transporte seguro (HTTPS/TLS) é obrigatório em produção.',
    });
  }
  next();
};

app.use(requireHttpsInProduction);
app.use(
  helmet({
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    contentSecurityPolicy: false,
  })
);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8081'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        structuredLog('WARN', 'CORS_ORIGIN_BLOCKED', 'Origem rejeitada pela política de CORS', {
          origin,
        });
        callback(new Error('CORS_NOT_ALLOWED'));
      }
    },
  })
);

app.use(express.json({ limit: '1mb' }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    structuredLog('WARN', 'RATE_LIMIT_EXCEEDED', 'Limite global de requisições excedido', {
      ip: req.ip,
      endpoint: req.originalUrl,
    });
    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Muitas requisições deste IP, tente novamente mais tarde.',
    });
  },
});
app.use(globalLimiter);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    structuredLog('SECURITY_ALERT', 'AUTH_BRUTE_FORCE_DETECTED', 'Limite de tentativas de login excedido', {
      ip: req.ip,
    });
    res.status(429).json({
      error: 'RATE_LIMIT_EXCEEDED',
      message: 'Muitas tentativas de login. Aguarde 15 minutos por segurança.',
    });
  },
});

export type UserRole = 'Consultor' | 'Gestor' | 'Administrador' | 'ford-internal-user';

const loginSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres'),
  role: z.enum(['Consultor', 'Gestor', 'Administrador', 'ford-internal-user']).optional(),
});

const compareSchema = z.object({
  brand: z.string().min(1, 'Marca é obrigatória').max(40),
  model: z.string().min(1, 'Modelo é obrigatório').max(60),
  version: z.string().max(80).optional(),
  year: z.string().regex(/^\d{4}$/, 'Ano deve conter 4 dígitos'),
  attributes: z.array(z.string().max(60)).optional(),
});

interface AuthenticatedRequest extends Request {
  user?: {
    name: string;
    email: string;
    role: UserRole;
    iss: string;
    aud: string;
  };
}

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    structuredLog('WARN', 'AUTH_REQUIRED', 'Tentativa de acesso sem token Bearer', {
      ip: req.ip,
      endpoint: req.originalUrl,
    });
    return res.status(401).json({ error: 'AUTH_REQUIRED', message: 'Token de autenticação ausente.' });
  }

  jwt.verify(
    token,
    JWT_SECRET,
    { issuer: 'rivalis-auth-service', audience: 'ford-internal-platform' },
    (err, decoded) => {
      if (err) {
        structuredLog('WARN', 'INVALID_OR_EXPIRED_TOKEN', 'Falha na validação do token JWT', {
          ip: req.ip,
          endpoint: req.originalUrl,
          reason: err.message,
        });
        return res.status(403).json({ error: 'INVALID_TOKEN', message: 'Token inválido ou expirado.' });
      }
      req.user = decoded as AuthenticatedRequest['user'];
      next();
    }
  );
};

const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      structuredLog('SECURITY_ALERT', 'RBAC_ACCESS_DENIED', 'Acesso negado por perfil insuficiente', {
        userEmail: req.user?.email,
        userRole: req.user?.role,
        requiredRoles: allowedRoles,
        endpoint: req.originalUrl,
      });
      return res.status(403).json({
        error: 'FORBIDDEN_ROLE',
        message: 'Seu perfil não possui permissão para executar esta operação.',
      });
    }
    next();
  };
};

const verifyHmacSignature = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-payload-signature'] as string | undefined;
  const timestamp = req.headers['x-payload-timestamp'] as string | undefined;

  if (!signature || !timestamp) {
    structuredLog('SECURITY_ALERT', 'SIGNATURE_REQUIRED', 'Requisição de integração sem assinatura HMAC', {
      ip: req.ip,
    });
    return res.status(401).json({ error: 'SIGNATURE_REQUIRED', message: 'Cabeçalhos HMAC ausentes.' });
  }

  const now = Date.now();
  const reqTime = Number(timestamp);
  if (Number.isNaN(reqTime) || Math.abs(now - reqTime) > 5 * 60 * 1000) {
    structuredLog('SECURITY_ALERT', 'SIGNATURE_EXPIRED', 'Timestamp HMAC expirado (possível Replay Attack)', {
      ip: req.ip,
      timestamp,
    });
    return res.status(401).json({ error: 'SIGNATURE_EXPIRED', message: 'Assinatura expirada.' });
  }

  const payloadString = `\({timestamp}.\){JSON.stringify(req.body)}`;
  const expectedSignature = crypto.createHmac('sha256', HMAC_SECRET).update(payloadString).digest('hex');

  const sigBuffer = Buffer.from(signature, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    structuredLog('SECURITY_ALERT', 'INVALID_PAYLOAD_SIGNATURE', 'Assinatura HMAC inválida detectada', {
      ip: req.ip,
    });
    return res.status(401).json({ error: 'INVALID_PAYLOAD_SIGNATURE', message: 'Integridade do payload violada.' });
  }

  next();
};

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'API Segura do Rivalis operando normalmente',
    service: 'rivalis-security-api',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/auth/login', loginLimiter, (req, res) => {
  try {
    const { name, email, password, role } = loginSchema.parse(req.body);

    if (password === '1234') {
      const assignedRole: UserRole =
        role || (email.startsWith('admin@') ? 'Administrador' : email.startsWith('gestor@') ? 'Gestor' : 'Consultor');

      const token = jwt.sign(
        { name: name || 'Colaborador Ford', email, role: assignedRole },
        JWT_SECRET,
        {
          expiresIn: '2h',
          issuer: 'rivalis-auth-service',
          audience: 'ford-internal-platform',
        }
      );

      structuredLog('INFO', 'USER_LOGIN_SUCCESS', 'Autenticação concluída com sucesso', {
        email,
        role: assignedRole,
        ip: req.ip,
      });

      return res.status(200).json({
        message: 'Login bem-sucedido',
        token,
        user: { name: name || 'Colaborador Ford', email, role: assignedRole },
      });
    }

    structuredLog('WARN', 'USER_LOGIN_FAILED', 'Tentativa de login com credenciais inválidas', {
      email,
      ip: req.ip,
    });
    return res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'Credenciais inválidas' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      structuredLog('WARN', 'LOGIN_VALIDATION_ERROR', 'Payload de login rejeitado pelo schema Zod', {
        ip: req.ip,
      });
      return res.status(400).json({ error: 'INVALID_LOGIN_PAYLOAD', details: error.errors });
    }
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
});

app.post(
  '/api/compare',
  authenticateToken,
  authorizeRoles('Consultor', 'Gestor', 'Administrador', 'ford-internal-user'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const data = compareSchema.parse(req.body);

      structuredLog('INFO', 'COMPETITOR_COMPARE_EXECUTED', 'Consulta competitiva processada com sucesso', {
        userEmail: req.user?.email,
        userRole: req.user?.role,
        brand: data.brand,
        model: data.model,
      });

      return res.status(200).json({
        message: 'Comparação gerada com sucesso!',
        reference: data,
        results: [
          {
            brand: 'Ford',
            model: 'Ranger Raptor 3.0 V6 Bi-Turbo',
            year: data.year,
            highlight: 'Referência Oficial Ford Validada (397 cv / 59,4 kgfm)',
          },
          {
            brand: 'Toyota',
            model: 'Hilux GR-Sport',
            year: data.year,
            highlight: 'Concorrente direto analisado (224 cv / 55,0 kgfm)',
          },
        ],
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        structuredLog('WARN', 'INVALID_COMPARE_PAYLOAD', 'Payload de comparação inválido', {
          userEmail: req.user?.email,
        });
        return res.status(400).json({ error: 'INVALID_COMPARE_PAYLOAD', details: error.errors });
      }
      return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
  }
);

app.post(
  '/api/integrations/external-specs',
  authenticateToken,
  authorizeRoles('Gestor', 'Administrador'),
  verifyHmacSignature,
  (req: AuthenticatedRequest, res: Response) => {
    structuredLog('INFO', 'EXTERNAL_SPECS_UPDATED', 'Carga de especificações externas validada via HMAC', {
      userEmail: req.user?.email,
      userRole: req.user?.role,
    });
    return res.status(200).json({ status: 'SPECS_INGESTED_SUCCESSFULLY' });
  }
);

app.listen(PORT, () => {
  structuredLog('INFO', 'SERVER_STARTED', `Rivalis Security API rodando na porta ${PORT}`);
});
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_nao_use_em_prod';

app.use(helmet());


const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:8081'];
app.use(cors({
  origin: (origin, callback) => {
    // Permite requisições sem origem (como ferramentas de teste no backend) ou origens autorizadas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS - Origem não autorizada'));
    }
  }
}));

app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Muitas requisições deste IP, tente novamente mais tarde.' }
});
app.use(globalLimiter);

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 10,
  message: { error: 'Muitas tentativas de login. Aguarde 5 minutos por segurança.' }
});

const loginSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres')
});

const compareSchema = z.object({
  brand: z.string().min(1, 'Marca é obrigatória'),
  model: z.string().min(1, 'Modelo é obrigatório'),
  year: z.string().length(4, 'Ano inválido')
});

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: "Bearer "

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token de autenticação ausente.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado.' });
    (req as any).user = user;
    next();
  });
};

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Segura do Rivalis operando normalmente', timestamp: new Date() });
});

// Rota de Login Simulada (Com limite de tentativas e validação Zod)
app.post('/api/auth/login', loginLimiter, (req, res) => {
  try {
    const { name, email, password } = loginSchema.parse(req.body);

    if (password === '1234') {
      const token = jwt.sign({ name: name || 'Colaborador', email }, JWT_SECRET, { expiresIn: '2h' });
      return res.status(200).json({ message: 'Login bem-sucedido', token });
    }

    return res.status(401).json({ error: 'Credenciais inválidas' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados inválidos enviados', details: error.errors });
    }
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.post('/api/compare', authenticateToken, (req, res) => {
  try {
    const data = compareSchema.parse(req.body);
    

    res.status(200).json({
      message: 'Comparação gerada com sucesso!',
      reference: data,
      results: [
        { brand: 'Toyota', model: 'Hilux', year: data.year, highlight: 'Forte concorrente' }
      ]
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Dados da pesquisa inválidos', details: error.errors });
    }
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`🛡️  Rivalis Security API rodando na porta ${PORT}`);
});
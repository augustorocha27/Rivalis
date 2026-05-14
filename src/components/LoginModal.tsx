import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LockKeyhole, Mail, ShieldCheck, User, X } from 'lucide-react-native';

import { colors, fonts, radius, shadows, spacing } from '../theme';
import { AnimatedButton } from './AnimatedButton';

export type AuthenticatedUser = {
  name: string;
  email: string;
};

type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
  onAuthenticated: (user: AuthenticatedUser) => void;
};

type AuthStatus = 'idle' | 'loading' | 'success';

function getNameFromEmail(email: string) {
  const prefix = email.split('@')[0] || 'Colaborador';
  return prefix
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function LoginModal({ visible, onClose, onAuthenticated }: LoginModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<AuthStatus>('idle');

  const handleLogin = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (status === 'loading') return;

    if (!cleanEmail || !password.trim()) {
      setMessage('Preencha email corporativo e senha para autenticar.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setMessage('Informe um email válido. Exemplo: nome.sobrenome@empresa.com');
      return;
    }

    if (password.trim().length < 4) {
      setMessage('A senha demonstrativa precisa ter pelo menos 4 caracteres.');
      return;
    }

    setStatus('loading');
    setMessage('Validando credenciais demonstrativas...');

    setTimeout(() => {
      const authenticatedUser = {
        name: cleanName || getNameFromEmail(cleanEmail),
        email: cleanEmail,
      };

      onAuthenticated(authenticatedUser);
      setStatus('success');
      setPassword('');
      setMessage('Acesso autorizado. Redirecionando para o painel Rivalis...');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
        onClose();
      }, 450);
    }, 700);
  };

  const closeModal = () => {
    if (status === 'loading') return;
    setStatus('idle');
    setMessage('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent={false} animationType="fade" onRequestClose={closeModal}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <View style={styles.iconBadge}>
              <LockKeyhole size={24} color={colors.accent} strokeWidth={2.6} />
            </View>
            <View style={styles.headerCopy}>
              <Text style={styles.kicker}>Acesso interno</Text>
              <Text style={styles.title}>Login Rivalis</Text>
            </View>
            <Pressable onPress={closeModal} style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
              <X size={20} color={colors.textPrimary} strokeWidth={2.5} />
            </Pressable>
          </View>

          <Text style={styles.description}>
            Autenticação simulada para demonstrar o fluxo de acesso dos colaboradores. Em uma implantação real, esta etapa pode ser conectada ao login corporativo.
          </Text>

          <View style={styles.authFlowCard}>
            <View style={[styles.authStep, styles.authStepActive]}>
              <Text style={styles.authStepNumber}>1</Text>
              <Text style={styles.authStepText}>Credenciais</Text>
            </View>
            <View style={[styles.authStep, status !== 'idle' && styles.authStepActive]}>
              <Text style={styles.authStepNumber}>2</Text>
              <Text style={styles.authStepText}>Validação</Text>
            </View>
            <View style={[styles.authStep, status === 'success' && styles.authStepActive]}>
              <Text style={styles.authStepNumber}>3</Text>
              <Text style={styles.authStepText}>Acesso liberado</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do colaborador</Text>
            <View style={styles.inputShell}>
              <User size={18} color={colors.accent} strokeWidth={2.4} />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ex: Nome Sobrenome"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="words"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email corporativo</Text>
            <View style={styles.inputShell}>
              <Mail size={18} color={colors.accent} strokeWidth={2.4} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="nome.sobrenome@empresa.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputShell}>
              <ShieldCheck size={18} color={colors.accent} strokeWidth={2.4} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Digite qualquer senha para simular"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          {message ? <Text style={[styles.message, status === 'success' && styles.successMessage]}>{message}</Text> : null}

          <View style={styles.actions}>
            <AnimatedButton label={status === 'loading' ? 'Autenticando...' : 'Entrar'} onPress={handleLogin} />
            <Pressable onPress={closeModal} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.34)',
  },
  headerCopy: {
    flex: 1,
  },
  kicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  title: {
    marginTop: 3,
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 26,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  description: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  authFlowCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundSoft,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  authStep: {
    flex: 1,
    minWidth: 130,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  authStepActive: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceElevated,
  },
  authStepNumber: {
    fontFamily: fonts.headingBold,
    color: colors.accent,
    fontSize: 16,
  },
  authStepText: {
    marginTop: 2,
    fontFamily: fonts.bodySemiBold,
    color: colors.silver,
    fontSize: 12,
  },
  inputGroup: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  label: {
    fontFamily: fonts.bodyBold,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  inputShell: {
    minHeight: 56,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: fonts.bodySemiBold,
    color: colors.textPrimary,
    fontSize: 15,
    minHeight: 54,
  },
  message: {
    marginTop: spacing.md,
    fontFamily: fonts.bodySemiBold,
    color: colors.silver,
    fontSize: 13,
    lineHeight: 20,
  },
  successMessage: {
    color: colors.accent,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
  },
  secondaryButtonText: {
    fontFamily: fonts.bodyBold,
    color: colors.silver,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});

import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LockKeyhole, Mail, ShieldCheck, X } from 'lucide-react-native';

import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { AnimatedButton } from './AnimatedButton';

type LoginModalProps = {
  visible: boolean;
  onClose: () => void;
};

export function LoginModal({ visible, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setMessage('Preencha email corporativo e senha para continuar.');
      return;
    }

    setMessage('Login demonstrativo validado. Conecte sua autenticação real depois.');
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <LinearGradient colors={gradients.premiumPanel} style={styles.modalCard}>
          <View style={styles.headerRow}>
            <View style={styles.iconBadge}>
              <LockKeyhole size={24} color={colors.accent} strokeWidth={2.6} />
            </View>
            <View style={styles.headerCopy}>
              <Text style={styles.kicker}>Acesso interno</Text>
              <Text style={styles.title}>Login Rivalis</Text>
            </View>
            <Pressable onPress={onClose} style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
              <X size={20} color={colors.textPrimary} strokeWidth={2.5} />
            </Pressable>
          </View>

          <Text style={styles.description}>
            Área demonstrativa para simular autenticação de colaboradores. Em uma implantação real, esta etapa pode ser integrada ao login corporativo.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email corporativo</Text>
            <View style={styles.inputShell}>
              <Mail size={18} color={colors.accent} strokeWidth={2.4} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="nome@empresa.com"
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
                placeholder="Digite sua senha"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                style={styles.input}
              />
            </View>
          </View>

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            <AnimatedButton label="Entrar" onPress={handleLogin} pulse={false} />
            <Pressable onPress={onClose} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </LinearGradient>
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
    backgroundColor: 'rgba(0,0,0,0.66)',
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.accentSoft,
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
    backgroundColor: colors.glass,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
    backgroundColor: colors.glass,
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

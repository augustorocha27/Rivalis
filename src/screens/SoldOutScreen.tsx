import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BellRing, ChevronLeft, LockKeyhole } from 'lucide-react-native';
import { MotiView } from 'moti';

import type { RootStackParamList } from '../@types/navigation';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function SoldOutScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <LinearGradient colors={gradients.appBackground} style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <MotiView
          from={{ opacity: 0, translateY: 24, scale: 0.97 }}
          animate={{ opacity: 1, translateY: 0, scale: 1 }}
          transition={{ type: 'timing', duration: 560 }}
          style={styles.cardWrapper}
        >
          <LinearGradient colors={gradients.premiumPanel} style={styles.card}>
            <View style={styles.iconBadge}>
              <LockKeyhole size={38} color={colors.accent} strokeWidth={2.6} />
            </View>
            <Text style={styles.kicker}>Piloto interno</Text>
            <Text style={styles.title}>A primeira rodada do piloto interno foi preenchida.</Text>
            <Text style={styles.description}>
              A primeira rodada de validação do Rivalis MVP já foi encerrada. Ainda é possível entrar na lista para uma próxima etapa com novas equipes, áreas ou concessionárias participantes.
            </Text>
            <Pressable onPress={() => navigation.navigate('Obrigado')} style={({ pressed }) => [styles.mainButton, pressed && styles.buttonPressed]}>
              <BellRing size={18} color={colors.textPrimary} />
              <Text style={styles.mainButtonText}>Entrar na próxima rodada</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Home')} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
              <ChevronLeft size={18} color={colors.silver} />
              <Text style={styles.secondaryButtonText}>Voltar para a página inicial</Text>
            </Pressable>
          </LinearGradient>
        </MotiView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 680,
    borderRadius: radius.xl,
    ...shadows.card,
  },
  card: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  iconBadge: {
    width: 78,
    height: 78,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.36)',
    marginBottom: spacing.xl,
  },
  kicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1.9,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 34,
    textAlign: 'center',
    letterSpacing: -1.1,
  },
  description: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  mainButton: {
    marginTop: spacing.xl,
    minHeight: 54,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadows.primaryGlow,
  },
  secondaryButton: {
    marginTop: spacing.md,
    minHeight: 52,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  mainButtonText: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  secondaryButtonText: {
    fontFamily: fonts.bodyBold,
    color: colors.silver,
    fontSize: 14,
  },
});

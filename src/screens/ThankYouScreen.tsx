import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckCircle2, ChevronLeft, Mail } from 'lucide-react-native';
import { MotiView } from 'moti';

import type { RootStackParamList } from '../@types/navigation';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ThankYouScreen() {
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
              <CheckCircle2 size={38} color={colors.accent} strokeWidth={2.6} />
            </View>
            <Text style={styles.kicker}>Piloto interno Rivalis</Text>
            <Text style={styles.title}>Solicitação de piloto registrada.</Text>
            <Text style={styles.description}>
              Obrigado por demonstrar interesse no Rivalis como ferramenta interna de comparação. A próxima etapa é validar o escopo do piloto, a base de dados e o fluxo com as equipes envolvidas.
            </Text>
            <View style={styles.infoBox}>
              <Mail size={20} color={colors.accent} />
              <Text style={styles.infoText}>Para uma apresentação corporativa, valide dados técnicos, fontes oficiais e permissões internas antes de distribuir o MVP.</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Home')} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
              <ChevronLeft size={18} color={colors.textPrimary} />
              <Text style={styles.buttonText}>Voltar para a página inicial</Text>
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
    maxWidth: 640,
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
  infoBox: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  infoText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    color: colors.silver,
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
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
  buttonPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  buttonText: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});

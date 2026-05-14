import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { Gauge, Zap, Timer, Trophy, ShieldAlert } from 'lucide-react-native';

import type { BattleResult, ReferenceVehicle } from '../@types/car';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { SpecBar } from './SpecBar';

type BattleCardProps = {
  car: BattleResult;
  reference: ReferenceVehicle;
  index: number;
};

export function BattleCard({ car, reference, index }: BattleCardProps) {
  const statusLabel = car.rivalWinsBattle ? 'Concorrente acima da referência' : 'Modelo de referência em vantagem';
  const StatusIcon = car.rivalWinsBattle ? Trophy : ShieldAlert;
  const gradientColors = car.rivalWinsBattle ? gradients.cardWinner : gradients.cardLoser;

  const handlePress = async () => {
    await Haptics.selectionAsync();
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 32, scale: 0.96 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'timing', duration: 520, delay: index * 90 }}
      style={styles.motionWrapper}
    >
      <Pressable onPress={handlePress} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.brandBlock}>
              <Text style={styles.brand}>{car.brand}</Text>
              <Text style={styles.model}>{car.model}</Text>
            </View>

            <View style={[styles.statusPill, car.rivalWinsBattle ? styles.statusWin : styles.statusLose]}>
              <StatusIcon size={14} color={car.rivalWinsBattle ? colors.accent : colors.silver} strokeWidth={2.5} />
              <Text style={[styles.statusText, car.rivalWinsBattle ? styles.statusTextWin : styles.statusTextLose]}>
                {car.overallDiffPercent >= 0 ? '+' : ''}{car.overallDiffPercent}%
              </Text>
            </View>
          </View>

          <Text style={styles.highlight}>{car.highlight}</Text>

          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Gauge size={16} color={colors.accent} />
              <Text style={styles.metaLabel}>{car.engine}</Text>
            </View>
            <View style={styles.metaItem}>
              <Zap size={16} color={colors.primaryLight} />
              <Text style={styles.metaLabel}>{car.drivetrain}</Text>
            </View>
            <View style={styles.metaItem}>
              <Timer size={16} color={colors.warning} />
              <Text style={styles.metaLabel}>0-100 em {car.zeroToHundred}s</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.barsArea}>
            <SpecBar
              label="Potência"
              value={car.powerHp}
              referenceValue={reference.powerHp}
              unit="hp"
              diffPercent={car.powerDiffPercent}
              delay={index * 90 + 140}
            />
            <SpecBar
              label="Torque"
              value={car.torqueNm}
              referenceValue={reference.torqueNm}
              unit="Nm"
              diffPercent={car.torqueDiffPercent}
              delay={index * 90 + 260}
            />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.category}>{car.category}</Text>
            <Text style={styles.statusCaption}>{statusLabel}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  motionWrapper: {
    marginBottom: spacing.lg,
    borderRadius: radius.lg,
    ...shadows.card,
  },
  pressable: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  brandBlock: {
    flex: 1,
  },
  brand: {
    fontFamily: fonts.bodyBold,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  model: {
    marginTop: 3,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 22,
    letterSpacing: -0.4,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
  },
  statusWin: {
    backgroundColor: 'rgba(0,229,255,0.10)',
    borderColor: 'rgba(0,229,255,0.32)',
  },
  statusLose: {
    backgroundColor: 'rgba(199,208,221,0.08)',
    borderColor: 'rgba(199,208,221,0.22)',
  },
  statusText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
  },
  statusTextWin: {
    color: colors.accent,
  },
  statusTextLose: {
    color: colors.silver,
  },
  highlight: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  metaGrid: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  metaLabel: {
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 11,
  },
  divider: {
    marginVertical: spacing.lg,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  barsArea: {
    gap: spacing.lg,
  },
  footerRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  category: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 12,
  },
  statusCaption: {
    flex: 1,
    textAlign: 'right',
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 11,
  },
});

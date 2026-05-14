import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, radius, spacing } from '../theme';

type SpecBarProps = {
  label: string;
  value: number;
  referenceValue: number;
  unit: string;
  diffPercent: number;
  delay?: number;
};

export function SpecBar({ label, value, referenceValue, unit, diffPercent, delay = 0 }: SpecBarProps) {
  const rivalWins = value >= referenceValue;
  const biggest = Math.max(value, referenceValue, 1);
  const fillWidth = Math.max(8, Math.min(100, (value / biggest) * 100));
  const referenceWidth = Math.max(8, Math.min(100, (referenceValue / biggest) * 100));
  const fillColors = rivalWins ? [colors.accent, '#56D8FF'] : [colors.primaryLight, colors.primaryDark];
  const diffLabel = `${diffPercent >= 0 ? '+' : ''}${diffPercent}%`;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.diffPill, rivalWins ? styles.diffPillWin : styles.diffPillLose]}>
          <Text style={[styles.diffText, rivalWins ? styles.diffTextWin : styles.diffTextLose]}>{diffLabel}</Text>
        </View>
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.unitText}>{unit}</Text>
        <Text style={styles.referenceText}>Ref. {referenceValue} {unit}</Text>
      </View>

      <View style={styles.track}>
        <MotiView
          from={{ width: '0%', opacity: 0 }}
          animate={{ width: `${fillWidth}%`, opacity: 1 }}
          transition={{ type: 'timing', duration: 820, delay }}
          style={styles.animatedFillWrapper}
        >
          <LinearGradient colors={fillColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fill} />
        </MotiView>
        <View style={[styles.referenceMarker, { left: `${referenceWidth}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.bodySemiBold,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  diffPill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
  },
  diffPillWin: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(0,174,239,0.35)',
  },
  diffPillLose: {
    backgroundColor: 'rgba(0,102,179,0.14)',
    borderColor: 'rgba(0,102,179,0.35)',
  },
  diffText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
  },
  diffTextWin: {
    color: colors.accent,
  },
  diffTextLose: {
    color: colors.silver,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  valueText: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 22,
  },
  unitText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12,
  },
  referenceText: {
    marginLeft: 'auto',
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 11,
  },
  track: {
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    position: 'relative',
  },
  animatedFillWrapper: {
    height: '100%',
  },
  fill: {
    flex: 1,
    borderRadius: radius.pill,
  },
  referenceMarker: {
    position: 'absolute',
    top: 0,
    width: 2,
    height: 11,
    backgroundColor: colors.textPrimary,
    opacity: 0.55,
  },
});

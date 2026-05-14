import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import { ChevronRight } from 'lucide-react-native';

import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

type AnimatedButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  pulse?: boolean;
};

export function AnimatedButton({ label, onPress, style, pulse = true }: AnimatedButtonProps) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  return (
    <MotiView
      from={{ scale: 0.98, opacity: 0.92 }}
      animate={{ scale: pulse ? 1.025 : 1, opacity: 1 }}
      transition={{
        type: 'timing',
        duration: 1400,
        loop: pulse,
        repeatReverse: true,
      }}
      style={[styles.motionWrapper, style]}
    >
      <Pressable onPress={handlePress} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <LinearGradient colors={gradients.primaryButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          <Text style={styles.label}>{label}</Text>
          <MotiView
            from={{ translateX: 0 }}
            animate={{ translateX: 4 }}
            transition={{ type: 'timing', duration: 700, loop: true, repeatReverse: true }}
            style={styles.iconBox}
          >
            <ChevronRight size={20} color={colors.textPrimary} strokeWidth={2.8} />
          </MotiView>
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  motionWrapper: {
    borderRadius: radius.pill,
    ...shadows.primaryGlow,
  },
  pressable: {
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  gradient: {
    minHeight: 58,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  label: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 15,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
});

import React from 'react';
import { Pressable, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { ChevronRight } from 'lucide-react-native';

import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

type AnimatedButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function AnimatedButton({ label, onPress, style }: AnimatedButtonProps) {
  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress();
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable onPress={handlePress} style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
        <LinearGradient colors={gradients.primaryButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.iconBox}>
            <ChevronRight size={20} color={colors.textPrimary} strokeWidth={2.8} />
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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

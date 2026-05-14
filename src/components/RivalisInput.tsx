import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInputProps } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { LucideIcon } from 'lucide-react-native';

import { colors, fonts, radius, shadows, spacing } from '../theme';

type RivalisInputProps = TextInputProps & {
  label: string;
  icon: LucideIcon;
  suffix?: string;
};

export function RivalisInput({ label, icon: Icon, suffix, style, ...rest }: RivalisInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputShell, focused && styles.inputShellFocused]}>
        <Icon size={19} color={focused ? colors.accent : colors.textSecondary} strokeWidth={2.4} />
        <BottomSheetTextInput
          {...rest}
          placeholderTextColor={colors.textMuted}
          onFocus={(event) => {
            setFocused(true);
            rest.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            rest.onBlur?.(event);
          }}
          style={[styles.input, style]}
        />
        {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  inputShellFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceElevated,
    ...shadows.cyanGlow,
  },
  input: {
    flex: 1,
    minHeight: 56,
    fontFamily: fonts.bodySemiBold,
    color: colors.textPrimary,
    fontSize: 16,
  },
  suffix: {
    fontFamily: fonts.bodyBold,
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

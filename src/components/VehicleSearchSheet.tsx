import React, { RefObject, useMemo, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Car, Gauge, RotateCcw, Search, Zap } from 'lucide-react-native';

import type { ReferenceVehicle } from '../@types/car';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { AnimatedButton } from './AnimatedButton';
import { RivalisInput } from './RivalisInput';

type VehicleSearchSheetProps = {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  onSubmit: (reference: ReferenceVehicle) => void;
};

const normalizeNumber = (value: string) => {
  const onlyNumbers = value.replace(/[^0-9,.]/g, '').replace(',', '.');
  return Number(onlyNumbers);
};

export function VehicleSearchSheet({ bottomSheetRef, onSubmit }: VehicleSearchSheetProps) {
  const snapPoints = useMemo(() => ['62%', '86%'], []);
  const [name, setName] = useState('Ford Ranger');
  const [powerHp, setPowerHp] = useState('210');
  const [torqueNm, setTorqueNm] = useState('500');
  const [error, setError] = useState('');

  const handleReset = async () => {
    await Haptics.selectionAsync();
    setName('Ford Ranger');
    setPowerHp('210');
    setTorqueNm('500');
    setError('');
  };

  const handleSubmit = async () => {
    const parsedPower = normalizeNumber(powerHp);
    const parsedTorque = normalizeNumber(torqueNm);

    if (!name.trim() || !parsedPower || !parsedTorque || parsedPower <= 0 || parsedTorque <= 0) {
      setError('Preencha nome, potência e torque com valores válidos.');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setError('');
    Keyboard.dismiss();
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSubmit({
      name: name.trim(),
      powerHp: parsedPower,
      torqueNm: parsedTorque,
    });
    bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.72} />
      )}
    >
      <BottomSheetScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={gradients.sheet} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.innerPanel}>
          <View style={styles.titleRow}>
            <View style={styles.iconBadge}>
              <Search size={24} color={colors.accent} strokeWidth={2.6} />
            </View>
            <View style={styles.titleBlock}>
              <Text style={styles.kicker}>Comparador interno</Text>
              <Text style={styles.title}>Informe o modelo Ford</Text>
            </View>
          </View>

          <Text style={styles.description}>
            O Rivalis cruza potência e torque contra concorrentes diretos para apoiar benchmarking, treinamento e argumentação técnica.
          </Text>

          <View style={styles.formArea}>
            <RivalisInput
              label="Modelo Ford de referência"
              icon={Car}
              value={name}
              onChangeText={setName}
              placeholder="Ex: Ford Ranger"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <View style={styles.doubleGrid}>
              <View style={styles.doubleGridItem}>
                <RivalisInput
                  label="Potência"
                  icon={Gauge}
                  value={powerHp}
                  onChangeText={setPowerHp}
                  keyboardType="numeric"
                  placeholder="210"
                  suffix="hp"
                />
              </View>
              <View style={styles.doubleGridItem}>
                <RivalisInput
                  label="Torque"
                  icon={Zap}
                  value={torqueNm}
                  onChangeText={setTorqueNm}
                  keyboardType="numeric"
                  placeholder="500"
                  suffix="Nm"
                />
              </View>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.actionsRow}>
            <View style={styles.resetButtonWrapper}>
              <AnimatedButton label="Reset" onPress={handleReset} pulse={false} />
              <View style={styles.resetIconOverlay} pointerEvents="none">
                <RotateCcw size={16} color={colors.textPrimary} />
              </View>
            </View>
            <View style={styles.submitButtonWrapper}>
              <AnimatedButton label="Comparar Concorrentes" onPress={handleSubmit} />
            </View>
          </View>
        </LinearGradient>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  handleIndicator: {
    width: 46,
    height: 5,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.24)',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  innerPanel: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  titleRow: {
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
    borderColor: 'rgba(0,174,239,0.32)',
  },
  titleBlock: {
    flex: 1,
  },
  kicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  title: {
    marginTop: 2,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 24,
    letterSpacing: -0.6,
  },
  description: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
  },
  formArea: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  doubleGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  doubleGridItem: {
    flex: 1,
  },
  errorText: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodySemiBold,
    color: colors.warning,
    fontSize: 13,
  },
  actionsRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.md,
  },
  resetButtonWrapper: {
    width: 118,
    position: 'relative',
  },
  resetIconOverlay: {
    position: 'absolute',
    right: 16,
    top: 21,
  },
  submitButtonWrapper: {
    flex: 1,
  },
});

import React, { RefObject, useMemo, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { CalendarDays, Car, RotateCcw, Search, Shapes } from 'lucide-react-native';

import type { ReferenceVehicle, VehicleBodyType } from '../@types/car';
import { buildFordReference, vehicleBodyTypes } from '../data/fordReferences';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { AnimatedButton } from './AnimatedButton';
import { RivalisInput } from './RivalisInput';

type VehicleSearchSheetProps = {
  bottomSheetRef: RefObject<BottomSheetModal | null>;
  onSubmit: (reference: ReferenceVehicle) => void;
};

export function VehicleSearchSheet({ bottomSheetRef, onSubmit }: VehicleSearchSheetProps) {
  const snapPoints = useMemo(() => ['66%', '88%'], []);
  const [model, setModel] = useState('Ford Ranger');
  const [year, setYear] = useState('2025');
  const [bodyType, setBodyType] = useState<VehicleBodyType>('Picape');
  const [error, setError] = useState('');

  const handleReset = async () => {
    await Haptics.selectionAsync();
    setModel('Ford Ranger');
    setYear('2025');
    setBodyType('Picape');
    setError('');
  };

  const handleSubmit = async () => {
    const parsedYear = Number(year.replace(/[^0-9]/g, ''));

    if (!model.trim() || !parsedYear || parsedYear < 1950 || parsedYear > 2100) {
      setError('Preencha modelo e ano com valores válidos. Exemplo: Ford Ranger, 2025.');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    setError('');
    Keyboard.dismiss();
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onSubmit(buildFordReference(model, year, bodyType));
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
              <Text style={styles.title}>Pesquisar comparação</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Informe apenas modelo, ano e tipo do veículo Ford. O MVP usa presets demonstrativos para gerar a análise competitiva e exibir os resultados em uma página dedicada.
          </Text>

          <View style={styles.formArea}>
            <RivalisInput
              label="Modelo"
              icon={Car}
              value={model}
              onChangeText={setModel}
              placeholder="Ex: Ford Ranger"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <RivalisInput
              label="Ano"
              icon={CalendarDays}
              value={year}
              onChangeText={setYear}
              keyboardType="numeric"
              placeholder="2025"
              maxLength={4}
            />

            <View style={styles.typeArea}>
              <View style={styles.typeLabelRow}>
                <Shapes size={17} color={colors.accent} strokeWidth={2.4} />
                <Text style={styles.typeLabel}>Tipo</Text>
              </View>

              <View style={styles.typeGrid}>
                {vehicleBodyTypes.map((type) => {
                  const selected = bodyType === type;
                  return (
                    <Pressable
                      key={type}
                      onPress={() => setBodyType(type)}
                      style={({ pressed }) => [
                        styles.typeChip,
                        selected && styles.typeChipSelected,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={[styles.typeChipText, selected && styles.typeChipTextSelected]}>{type}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Como o MVP calcula?</Text>
            <Text style={styles.previewDescription}>
              Nesta fase, o Rivalis associa o modelo/tipo a um preset técnico demonstrativo e filtra concorrentes do mesmo segmento para exibir todos os resultados.
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <View style={styles.resetButtonWrapper}>
              <AnimatedButton label="Reset" onPress={handleReset} pulse={false} />
              <View style={styles.resetIconOverlay} pointerEvents="none">
                <RotateCcw size={16} color={colors.textPrimary} />
              </View>
            </View>
            <View style={styles.submitButtonWrapper}>
              <AnimatedButton label="Ver Resultados" onPress={handleSubmit} pulse={false} />
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
  typeArea: {
    gap: spacing.md,
  },
  typeLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  typeChip: {
    paddingHorizontal: spacing.lg,
    minHeight: 42,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeChipSelected: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(0,174,239,0.48)',
  },
  typeChipText: {
    fontFamily: fonts.bodySemiBold,
    color: colors.textSecondary,
    fontSize: 13,
  },
  typeChipTextSelected: {
    color: colors.accent,
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },
  errorText: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodySemiBold,
    color: colors.warning,
    fontSize: 13,
  },
  previewCard: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
  },
  previewTitle: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 17,
  },
  previewDescription: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
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

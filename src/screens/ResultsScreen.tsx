import React, { useMemo, useRef } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, BarChart3, Car, Download, Gauge, Radar, RefreshCcw, Trophy, Zap } from 'lucide-react-native';

import type { ReferenceVehicle } from '../@types/car';
import type { RootStackParamList } from '../@types/navigation';
import { BattleCard } from '../components/BattleCard';
import { LoginModal } from '../components/LoginModal';
import { VehicleSearchSheet } from '../components/VehicleSearchSheet';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { useResponsive } from '../theme/responsive';
import { compareAgainstCompetitorCars } from '../utils/compareCars';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type ResultsRoute = RouteProp<RootStackParamList, 'Resultados'>;

export function ResultsScreen() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<ResultsRoute>();
  const { isPhone, isMobile, pagePadding, sectionGap } = useResponsive();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [loginVisible, setLoginVisible] = React.useState(false);

  const reference = route.params?.reference ?? {
    brand: 'Ford',
    name: 'Ranger',
    year: 2025,
    bodyType: 'Picape' as const,
    powerHp: 250,
    torqueNm: 600,
    sourceLabel: 'Preset demonstrativo padrão',
  };
  const results = useMemo(() => compareAgainstCompetitorCars(reference), [reference]);

  const summary = useMemo(() => {
    const referenceAhead = results.filter((item) => !item.rivalWinsBattle).length;
    const rivalsAhead = results.filter((item) => item.rivalWinsBattle).length;
    const strongestPower = results.reduce((max, item) => (item.powerHp > max.powerHp ? item : max), results[0]);
    const strongestTorque = results.reduce((max, item) => (item.torqueNm > max.torqueNm ? item : max), results[0]);

    return { referenceAhead, rivalsAhead, strongestPower, strongestTorque };
  }, [results]);

  const handleNewSearch = (newReference: ReferenceVehicle) => {
    navigation.setParams({ reference: newReference });
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.appBackground} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.navbar, isMobile && styles.navbarMobile, { paddingHorizontal: pagePadding }]}>
            <Pressable onPress={() => navigation.navigate('Home')} style={[styles.brandArea, isMobile && styles.brandAreaMobile]}>
              <View style={[styles.logoMark, isPhone && styles.logoMarkPhone]}>
                <Radar size={isPhone ? 18 : 20} color={colors.accent} strokeWidth={2.7} />
              </View>
              <View style={styles.brandCopy}>
                <Text style={[styles.brandName, isPhone && styles.brandNamePhone]}>RIVALIS</Text>
                <Text style={[styles.brandCaption, isPhone && styles.brandCaptionPhone]}>Resultados de comparação</Text>
              </View>
            </Pressable>

            <View style={[styles.navActions, isMobile && styles.navActionsMobile]}>
              <Pressable onPress={() => bottomSheetRef.current?.present()} style={({ pressed }) => [styles.navCta, isPhone && styles.navButtonPhone, pressed && styles.pressed]}>
                <Text style={styles.navCtaText}>Nova pesquisa</Text>
              </Pressable>
              <Pressable onPress={() => setLoginVisible(true)} style={({ pressed }) => [styles.loginButton, isPhone && styles.navButtonPhone, pressed && styles.pressed]}>
                <Text style={styles.loginButtonText}>Login</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingHorizontal: pagePadding, paddingTop: isPhone ? spacing.lg : spacing.xxl, paddingBottom: sectionGap }]}>
            <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <ArrowLeft size={18} color={colors.textPrimary} strokeWidth={2.6} />
              <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>

            <LinearGradient colors={gradients.premiumPanel} style={[styles.heroCard, isPhone && styles.heroCardPhone]}>
              <View style={[styles.heroTopRow, isPhone && styles.heroTopRowPhone]}>
                <View style={[styles.heroIconBox, isPhone && styles.heroIconBoxPhone]}>
                  <BarChart3 size={isPhone ? 24 : 30} color={colors.accent} strokeWidth={2.6} />
                </View>
                <View style={[styles.heroTitleBlock, isMobile && styles.fullWidth]}>
                  <Text style={styles.kicker}>Resultado da pesquisa</Text>
                  <Text style={[styles.title, isMobile && styles.titleMobile, isPhone && styles.titlePhone]}>Comparação completa: {reference.brand} {reference.name}</Text>
                </View>
              </View>

              <Text style={[styles.description, isPhone && styles.descriptionPhone]}>
                Esta página exibe todos os concorrentes encontrados para o segmento inferido de {reference.brand} {reference.name}. Use os cards para apoiar benchmarking, treinamento interno e leitura competitiva no dia a dia.
              </Text>

              <View style={[styles.referenceGrid, isPhone && styles.singleColumnGrid]}>
                <MetricCard icon={Car} label="Veículo consultado" value={`${reference.brand} ${reference.name}`} detail={`${reference.year} • Segmento: ${reference.bodyType}`} isPhone={isPhone} />
                <MetricCard icon={Zap} label="Potência estimada" value={`${reference.powerHp} hp`} detail={reference.sourceLabel || 'Preset demonstrativo'} isPhone={isPhone} />
                <MetricCard icon={Gauge} label="Torque estimado" value={`${reference.torqueNm} Nm`} detail="Usado como referência da comparação" isPhone={isPhone} />
              </View>
            </LinearGradient>

            <View style={[styles.summaryGrid, isPhone && styles.singleColumnGrid]}>
              <LinearGradient colors={gradients.card} style={[styles.summaryCard, isPhone && styles.fullWidth]}>
                <Trophy size={24} color={colors.accent} strokeWidth={2.5} />
                <Text style={styles.summaryValue}>{summary.referenceAhead}</Text>
                <Text style={styles.summaryLabel}>Rivais abaixo da referência</Text>
              </LinearGradient>

              <LinearGradient colors={gradients.card} style={[styles.summaryCard, isPhone && styles.fullWidth]}>
                <Radar size={24} color={colors.accent} strokeWidth={2.5} />
                <Text style={styles.summaryValue}>{summary.rivalsAhead}</Text>
                <Text style={styles.summaryLabel}>Rivais que exigem atenção</Text>
              </LinearGradient>

              <LinearGradient colors={gradients.card} style={[styles.summaryCard, isPhone && styles.fullWidth]}>
                <Zap size={24} color={colors.accent} strokeWidth={2.5} />
                <Text numberOfLines={2} style={styles.summaryValue}>{summary.strongestPower?.model || '-'}</Text>
                <Text style={styles.summaryLabel}>Maior potência entre rivais</Text>
              </LinearGradient>

              <LinearGradient colors={gradients.card} style={[styles.summaryCard, isPhone && styles.fullWidth]}>
                <Gauge size={24} color={colors.accent} strokeWidth={2.5} />
                <Text numberOfLines={2} style={styles.summaryValue}>{summary.strongestTorque?.model || '-'}</Text>
                <Text style={styles.summaryLabel}>Maior torque entre rivais</Text>
              </LinearGradient>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.kicker}>Todos os resultados</Text>
              <Text style={[styles.sectionTitle, isPhone && styles.sectionTitlePhone]}>{results.length} concorrentes encontrados</Text>
              <Text style={styles.sectionDescription}>
                Os resultados abaixo são ordenados pela diferença média de potência e torque contra o modelo Ford informado.
              </Text>
            </View>

            <View style={styles.resultsList}>
              {results.map((item, index) => (
                <BattleCard key={`${item.id}-${index}`} car={item} reference={reference} index={index} />
              ))}
            </View>

            <LinearGradient colors={gradients.premiumPanel} style={[styles.actionPanel, isPhone && styles.actionPanelPhone]}>
              <Text style={[styles.actionTitle, isPhone && styles.actionTitlePhone]}>Precisa apresentar essa análise?</Text>
              <Text style={styles.actionText}>
                Use esta tela como painel de apoio visual. Em uma próxima versão, o Rivalis pode exportar PDF, salvar histórico e comparar versões específicas.
              </Text>
              <View style={[styles.actionRow, isPhone && styles.actionRowPhone]}>
                <Pressable onPress={() => bottomSheetRef.current?.present()} style={({ pressed }) => [styles.secondaryAction, isPhone && styles.fullWidth, pressed && styles.pressed]}>
                  <RefreshCcw size={17} color={colors.accent} />
                  <Text style={styles.secondaryActionText}>Nova pesquisa</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [styles.secondaryAction, isPhone && styles.fullWidth, pressed && styles.pressed]}>
                  <Download size={17} color={colors.accent} />
                  <Text style={styles.secondaryActionText}>Exportação futura</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      <VehicleSearchSheet bottomSheetRef={bottomSheetRef} onSubmit={handleNewSearch} />
      <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} />
    </View>
  );
}

function MetricCard({ icon: Icon, label, value, detail, isPhone }: { icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; label: string; value: string; detail: string; isPhone: boolean }) {
  return (
    <View style={[styles.metricCard, isPhone && styles.fullWidth]}>
      <Icon size={22} color={colors.accent} strokeWidth={2.5} />
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDetail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  background: { flex: 1 },
  safeArea: { flex: 1 },
  navbar: {
    minHeight: 74,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(7,17,31,0.94)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  navbarMobile: { flexDirection: 'column', alignItems: 'stretch', gap: spacing.sm },
  brandArea: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minWidth: 194 },
  brandAreaMobile: { minWidth: 0, width: '100%' },
  brandCopy: { flexShrink: 1 },
  logoMark: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.36)' },
  logoMarkPhone: { width: 38, height: 38, borderRadius: 14 },
  brandName: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 16, letterSpacing: 2.8 },
  brandNamePhone: { fontSize: 15, letterSpacing: 2.2 },
  brandCaption: { marginTop: 2, fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 10, letterSpacing: 0.4 },
  brandCaptionPhone: { fontSize: 9 },
  navActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'flex-end' },
  navActionsMobile: { width: '100%', justifyContent: 'flex-start' },
  navButtonPhone: { flex: 1, minWidth: 140 },
  navCta: { minHeight: 40, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, ...shadows.cyanGlow },
  navCtaText: { fontFamily: fonts.bodyBold, color: colors.textPrimary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  loginButton: { minHeight: 40, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  loginButtonText: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  content: { width: '100%', maxWidth: 1180, alignSelf: 'center' },
  backButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl },
  backButtonText: { fontFamily: fonts.bodySemiBold, color: colors.silver, fontSize: 13 },
  heroCard: { borderRadius: radius.xl, padding: spacing.xxl, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  heroCardPhone: { padding: spacing.lg, borderRadius: radius.lg },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, flexWrap: 'wrap' },
  heroTopRowPhone: { alignItems: 'flex-start', gap: spacing.md },
  heroIconBox: { width: 64, height: 64, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.34)' },
  heroIconBoxPhone: { width: 54, height: 54, borderRadius: 18 },
  heroTitleBlock: { flex: 1, minWidth: 260 },
  fullWidth: { width: '100%', minWidth: 0, flex: 0 },
  kicker: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5 },
  title: { marginTop: spacing.sm, fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 38, lineHeight: 46, letterSpacing: -1.2 },
  titleMobile: { fontSize: 32, lineHeight: 39 },
  titlePhone: { fontSize: 25, lineHeight: 31, letterSpacing: -0.7 },
  description: { marginTop: spacing.lg, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 24, maxWidth: 900 },
  descriptionPhone: { fontSize: 14, lineHeight: 22 },
  referenceGrid: { marginTop: spacing.xl, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  singleColumnGrid: { flexDirection: 'column', alignItems: 'stretch' },
  metricCard: { flex: 1, minWidth: 230, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  metricLabel: { marginTop: spacing.md, fontFamily: fonts.bodyBold, color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8 },
  metricValue: { marginTop: 4, fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 20, lineHeight: 25 },
  metricDetail: { marginTop: spacing.sm, fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 12, lineHeight: 18 },
  summaryGrid: { marginTop: spacing.xl, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  summaryCard: { flex: 1, minWidth: 210, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  summaryValue: { marginTop: spacing.md, fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 22, lineHeight: 28 },
  summaryLabel: { marginTop: spacing.sm, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 13, lineHeight: 19 },
  sectionHeader: { marginTop: spacing.huge, marginBottom: spacing.xl },
  sectionTitle: { marginTop: spacing.sm, fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 31, lineHeight: 39 },
  sectionTitlePhone: { fontSize: 24, lineHeight: 31 },
  sectionDescription: { marginTop: spacing.md, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 24, maxWidth: 860 },
  resultsList: { gap: spacing.lg },
  actionPanel: { marginTop: spacing.huge, borderRadius: radius.xl, padding: spacing.xxl, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  actionPanelPhone: { padding: spacing.lg, borderRadius: radius.lg },
  actionTitle: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 28, lineHeight: 36 },
  actionTitlePhone: { fontSize: 23, lineHeight: 30 },
  actionText: { marginTop: spacing.md, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 24, maxWidth: 820 },
  actionRow: { marginTop: spacing.xl, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  actionRowPhone: { flexDirection: 'column', alignItems: 'stretch' },
  secondaryAction: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  secondaryActionText: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 13 },
});
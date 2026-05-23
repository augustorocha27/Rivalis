import React, { useMemo, useRef, useState } from 'react';
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Activity,
  BarChart3,
  Car,
  ChevronRight,
  ExternalLink,
  FileQuestion,
  Gauge,
  LineChart,
  LockKeyhole,
  Radar,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from 'lucide-react-native';

import type { ReferenceVehicle } from '../@types/car';
import type { RootStackParamList } from '../@types/navigation';
import { AnimatedButton } from '../components/AnimatedButton';
import { LoginModal, type AuthenticatedUser } from '../components/LoginModal';
import { VehicleSearchSheet } from '../components/VehicleSearchSheet';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { useResponsive } from '../theme/responsive';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const { isPhone, isMobile, pagePadding, sectionGap } = useResponsive();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
  const [pendingSearchAfterLogin, setPendingSearchAfterLogin] = useState(false);
  const [authNotice, setAuthNotice] = useState('');

  const navLinks = useMemo(
    () => [
      { label: 'Uso interno', route: 'UsoInterno' as keyof RootStackParamList },
      { label: 'Fluxo', route: 'Fluxo' as keyof RootStackParamList },
      { label: 'Análises', route: 'Analises' as keyof RootStackParamList },
      { label: 'FAQ', route: 'FAQ' as keyof RootStackParamList },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { label: 'Rotina interna', value: 'B2E', icon: Activity },
      { label: 'Leitura técnica', value: 'HP + Nm', icon: BarChart3 },
      { label: 'Benchmarking', value: 'Ford vs mercado', icon: Radar },
    ],
    [],
  );

  const quickAccess = useMemo(
    () => [
      {
        title: 'Uso interno',
        description: 'Veja como o Rivalis apoia colaboradores em treinamento, produto e atendimento.',
        icon: Users,
        route: 'UsoInterno' as keyof RootStackParamList,
      },
      {
        title: 'Fluxo',
        description: 'Entenda o caminho da pesquisa: marca, modelo, ano e resultados competitivos.',
        icon: Target,
        route: 'Fluxo' as keyof RootStackParamList,
      },
      {
        title: 'Análises',
        description: 'Conheça os indicadores usados nos cards, barras e ranking de concorrentes.',
        icon: LineChart,
        route: 'Analises' as keyof RootStackParamList,
      },
    ],
    [],
  );

  const openSearch = () => {
    if (!authenticatedUser) {
      setAuthNotice('Faça login para liberar a pesquisa de concorrentes.');
      setPendingSearchAfterLogin(true);
      setLoginVisible(true);
      return;
    }

    setAuthNotice('');
    bottomSheetRef.current?.present();
  };

  const handleAuthenticated = (user: AuthenticatedUser) => {
    setAuthenticatedUser(user);

    if (pendingSearchAfterLogin) {
      setPendingSearchAfterLogin(false);
      setAuthNotice('Login confirmado. A pesquisa foi liberada para este usuário.');

      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 700);
    } else {
      setAuthNotice('');
    }
  };

  const handleSearchSubmit = (reference: ReferenceVehicle) => {
    if (!authenticatedUser) {
      bottomSheetRef.current?.dismiss();
      setAuthNotice('Autentique-se antes de iniciar uma pesquisa.');
      setPendingSearchAfterLogin(true);
      setLoginVisible(true);
      return;
    }

    navigation.navigate('Resultados', { reference });
  };

  const openExternal = (url: string) => {
    Linking.openURL(url).catch(() => undefined);
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.appBackground} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.navbar, isMobile && styles.navbarMobile, { paddingHorizontal: pagePadding }]}>
            <Pressable onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} style={[styles.brandArea, isMobile && styles.brandAreaMobile]}>
              <View style={[styles.logoMark, isPhone && styles.logoMarkPhone]}>
                <Radar size={isPhone ? 18 : 20} color={colors.accent} strokeWidth={2.7} />
              </View>
              <View style={styles.brandCopy}>
                <Text style={[styles.brandName, isPhone && styles.brandNamePhone]}>RIVALIS</Text>
                <Text style={[styles.brandCaption, isPhone && styles.brandCaptionPhone]}>Internal Vehicle Intelligence</Text>
              </View>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.navLinks, isMobile && styles.navLinksMobile]}>
              {navLinks.map((item) => (
                <Pressable key={item.route} onPress={() => navigation.navigate(item.route)} style={({ pressed }) => [styles.navLink, isPhone && styles.navLinkPhone, pressed && styles.pressed]}>
                  <Text style={[styles.navLinkText, isPhone && styles.navLinkTextPhone]}>{item.label}</Text>
                </Pressable>
              ))}
              <Pressable onPress={openSearch} style={({ pressed }) => [styles.navCta, isPhone && styles.navCtaPhone, pressed && styles.pressed]}>
                <Text style={[styles.navCtaText, isPhone && styles.navCtaTextPhone]}>Comparar</Text>
              </Pressable>
              {authenticatedUser ? (
                <View style={styles.userBadge}>
                  <ShieldCheck size={15} color={colors.accent} strokeWidth={2.5} />
                  <View>
                    <Text numberOfLines={1} style={[styles.userBadgeName, isPhone && styles.userBadgeNamePhone]}>{authenticatedUser.name}</Text>
                    <Text style={styles.userBadgeStatus}>Autenticado</Text>
                  </View>
                </View>
              ) : (
                <Pressable onPress={() => setLoginVisible(true)} style={({ pressed }) => [styles.loginButton, isPhone && styles.loginButtonPhone, pressed && styles.pressed]}>
                  <LockKeyhole size={14} color={colors.silver} strokeWidth={2.4} />
                  <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
              )}
            </ScrollView>
          </View>

          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingHorizontal: pagePadding, paddingBottom: sectionGap }]}>
            <View style={[styles.heroSection, isMobile && styles.heroSectionMobile, { paddingTop: sectionGap, paddingBottom: sectionGap }]}>
              <MotiView
                from={{ opacity: 0, translateY: 26 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 620 }}
                style={[styles.heroCopy, isMobile && styles.fullWidth]}
              >
                <View style={[styles.heroBadge, isPhone && styles.heroBadgePhone]}>
                  <ShieldCheck size={16} color={colors.accent} strokeWidth={2.5} />
                  <Text style={styles.heroBadgeText}>Ferramenta interna para inteligência competitiva automotiva</Text>
                </View>

                <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile, isPhone && styles.heroTitlePhone]}>Compare modelos Ford contra concorrentes em uma tela de trabalho.</Text>
                <Text style={[styles.heroSubtitle, isPhone && styles.heroSubtitlePhone]}>
                  O Rivalis ajuda colaboradores a pesquisarem veículos por marca, modelo e ano para visualizar resultados comparativos contra concorrentes do mesmo segmento.
                </Text>

                <View style={[styles.heroActions, isPhone && styles.actionsMobile]}>
                  <AnimatedButton label="Comparar Concorrentes" onPress={openSearch} style={isPhone ? styles.fullButton : undefined} />
                  <Pressable onPress={() => navigation.navigate('Fluxo')} style={({ pressed }) => [styles.secondaryCta, isPhone && styles.fullButton, pressed && styles.pressed]}>
                    <Text style={styles.secondaryCtaText}>Ver fluxo de uso</Text>
                    <ChevronRight size={17} color={colors.accent} />
                  </Pressable>
                </View>

                <Text style={styles.microcopy}>Feito para consulta, benchmarking e preparação de argumentos internos — não para jornada de compra do cliente final.</Text>

                {authNotice ? (
                  <View style={styles.authNotice}>
                    <LockKeyhole size={16} color={colors.accent} strokeWidth={2.5} />
                    <Text style={styles.authNoticeText}>{authNotice}</Text>
                  </View>
                ) : null}

                <View style={[styles.statsGrid, isPhone && styles.singleColumnGrid]}>
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <LinearGradient key={stat.label} colors={gradients.card} style={[styles.statCard, isPhone && styles.fullWidth]}>
                        <Icon size={20} color={colors.accent} strokeWidth={2.5} />
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                      </LinearGradient>
                    );
                  })}
                </View>
              </MotiView>

              <MotiView
                from={{ opacity: 0, scale: 0.94, translateY: 20 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 720, delay: 180 }}
                style={[styles.heroVisualWrapper, isMobile && styles.fullWidth]}
              >
                <LinearGradient colors={gradients.premiumPanel} style={[styles.heroVisual, isPhone && styles.heroVisualPhone]}>
                  <View style={[styles.visualHeader, isPhone && styles.visualHeaderPhone]}>
                    <View style={styles.visualTitleBlock}>
                      <Text style={styles.visualKicker}>Painel de comparação</Text>
                      <Text style={[styles.visualTitle, isPhone && styles.visualTitlePhone]}>Pesquisa por segmento</Text>
                    </View>
                    <View style={styles.livePill}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>MVP</Text>
                    </View>
                  </View>

                  <View style={styles.searchPreviewCard}>
                    <Text style={styles.searchPreviewLabel}>Entrada da pesquisa</Text>
                    <View style={styles.searchPreviewRow}>
                      <Car size={20} color={colors.accent} />
                      <Text style={styles.searchPreviewText}>Modelo: Ford Ranger</Text>
                    </View>
                    <View style={styles.searchPreviewRow}>
                      <Gauge size={20} color={colors.accent} />
                      <Text style={styles.searchPreviewText}>Ano: 2025</Text>
                    </View>
                    <View style={styles.searchPreviewRow}>
                      <Zap size={20} color={colors.accent} />
                      <Text style={styles.searchPreviewText}>Marca: Ford</Text>
                    </View>
                  </View>

                  <View style={styles.visualBars}>
                    <MetricPreview label="Concorrentes filtrados" value="Mesmo tipo" percent="88%" />
                    <MetricPreview label="Ranking visual" value="HP + Nm" percent="76%" />
                    <MetricPreview label="Uso interno" value="Consulta rápida" percent="94%" />
                  </View>
                </LinearGradient>
              </MotiView>
            </View>

            <View style={[styles.quickAccessSection, { marginBottom: sectionGap }]}>
              <Text style={styles.sectionKicker}>Acesso rápido</Text>
              <Text style={[styles.sectionTitle, isPhone && styles.sectionTitlePhone]}>A Home agora é uma porta de entrada. O conteúdo detalhado fica em páginas próprias.</Text>
              <Text style={styles.sectionDescription}>
                Use os atalhos abaixo para navegar pelo material explicativo ou abra o comparador para gerar a tela completa de resultados.
              </Text>

              <View style={[styles.quickAccessGrid, isPhone && styles.singleColumnGrid]}>
                {quickAccess.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Pressable key={item.title} onPress={() => navigation.navigate(item.route)} style={({ pressed }) => [styles.quickAccessPressable, isPhone && styles.fullWidth, pressed && styles.pressed]}>
                      <LinearGradient colors={gradients.card} style={[styles.quickAccessCard, isPhone && styles.quickAccessCardPhone]}>
                        <View style={styles.quickAccessIcon}>
                          <Icon size={24} color={colors.accent} strokeWidth={2.5} />
                        </View>
                        <Text style={styles.quickAccessTitle}>{item.title}</Text>
                        <Text style={styles.quickAccessDescription}>{item.description}</Text>
                        <View style={styles.quickAccessFooter}>
                          <Text style={styles.quickAccessLink}>Abrir página</Text>
                          <ChevronRight size={17} color={colors.accent} />
                        </View>
                      </LinearGradient>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <LinearGradient colors={gradients.premiumPanel} style={[styles.comparePanel, isPhone && styles.comparePanelPhone, { marginBottom: sectionGap }]}>
              <Text style={styles.compareKicker}>Resultados em página dedicada</Text>
              <Text style={[styles.compareTitle, isPhone && styles.compareTitlePhone]}>Pesquise um modelo Ford e abra uma tela completa com todos os concorrentes.</Text>
              <Text style={styles.compareDescription}>
                O formulário foi simplificado para Marca, Modelo e Ano. A partir disso, o Rivalis filtra concorrentes e apresenta cards comparativos com ranking, potência, torque e leitura de vantagem competitiva. A pesquisa só é liberada após login demonstrativo.
              </Text>
              <View style={[styles.compareActions, isPhone && styles.actionsMobile]}>
                <AnimatedButton label="Comparar Concorrentes" onPress={openSearch} style={isPhone ? styles.fullButton : undefined} />
                <Pressable onPress={() => navigation.navigate('FAQ')} style={({ pressed }) => [styles.faqShortcut, isPhone && styles.fullButton, pressed && styles.pressed]}>
                  <FileQuestion size={17} color={colors.accent} strokeWidth={2.4} />
                  <Text style={styles.faqShortcutText}>Abrir FAQ</Text>
                </Pressable>
              </View>
            </LinearGradient>

            <LinearGradient colors={gradients.premiumPanel} style={[styles.footerShell, isPhone && styles.footerShellPhone]}>
              <View style={[styles.footerTop, isMobile && styles.footerTopMobile]}>
                <View style={[styles.footerBrandBlock, isMobile && styles.fullWidth]}>
                  <View style={[styles.footerLogoRow, isPhone && styles.footerLogoRowPhone]}>
                    <View style={styles.footerLogoMark}>
                      <Radar size={22} color={colors.accent} strokeWidth={2.7} />
                    </View>
                    <View style={styles.brandCopy}>
                      <Text style={styles.footerBrand}>RIVALIS</Text>
                      <Text style={styles.footerSubBrand}>Internal Vehicle Intelligence</Text>
                    </View>
                  </View>
                  <Text style={styles.footerText}>
                    Plataforma conceitual para apoiar equipes com comparação técnica, benchmarking e leitura competitiva de modelos Ford contra concorrentes diretos.
                  </Text>
                  <View style={styles.footerBadges}>
                    {['B2E', 'MVP', 'Benchmark', 'Uso interno'].map((badge) => (
                      <View key={badge} style={styles.footerBadge}>
                        <Text style={styles.footerBadgeText}>{badge}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={[styles.footerGrid, isMobile && styles.footerGridMobile]}>
                  <View style={[styles.footerColumn, isMobile && styles.footerColumnMobile]}>
                    <Text style={styles.footerColumnTitle}>Navegação</Text>
                    <Pressable onPress={() => navigation.navigate('UsoInterno')}><Text style={styles.footerLink}>Uso interno</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('Fluxo')}><Text style={styles.footerLink}>Fluxo</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('Analises')}><Text style={styles.footerLink}>Análises</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('FAQ')}><Text style={styles.footerLink}>FAQ</Text></Pressable>
                    <Pressable onPress={openSearch}><Text style={styles.footerLink}>Abrir comparador</Text></Pressable>
                  </View>

                  <View style={[styles.footerColumn, isMobile && styles.footerColumnMobile]}>
                    <Text style={styles.footerColumnTitle}>Aplicações</Text>
                    <Text style={styles.footerMutedLink}>Treinamento de produto</Text>
                    <Text style={styles.footerMutedLink}>Benchmarking competitivo</Text>
                    <Text style={styles.footerMutedLink}>Apoio comercial</Text>
                    <Text style={styles.footerMutedLink}>Consulta técnica rápida</Text>
                  </View>

                  <View style={[styles.footerColumn, isMobile && styles.footerColumnMobile]}>
                    <Text style={styles.footerColumnTitle}>Links</Text>
                    <Pressable onPress={() => openExternal('https://instagram.com/rivalis.app')} style={styles.externalLinkRow}>
                      <Text style={styles.footerLink}>Instagram</Text>
                      <ExternalLink size={12} color={colors.accent} />
                    </Pressable>
                    <Pressable onPress={() => openExternal('https://youtube.com/@rivalisapp')} style={styles.externalLinkRow}>
                      <Text style={styles.footerLink}>YouTube</Text>
                      <ExternalLink size={12} color={colors.accent} />
                    </Pressable>
                    <Pressable onPress={() => openExternal('https://linkedin.com/company/rivalis')} style={styles.externalLinkRow}>
                      <Text style={styles.footerLink}>LinkedIn</Text>
                      <ExternalLink size={12} color={colors.accent} />
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={styles.footerDivider} />

              <View style={styles.footerBottom}>
                <Text style={styles.footerLegal}>Rivalis — Compare com dados. Trabalhe com mais contexto.</Text>
                <Text style={styles.footerDisclaimer}>
                  MVP demonstrativo. Não utiliza logotipo oficial, não comunica parceria formal e os dados técnicos devem ser validados antes de qualquer uso corporativo real.
                </Text>
              </View>
            </LinearGradient>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      <VehicleSearchSheet bottomSheetRef={bottomSheetRef} onSubmit={handleSearchSubmit} />
      <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} onAuthenticated={handleAuthenticated} />
    </View>
  );
}

function MetricPreview({ label, value, percent }: { label: string; value: string; percent: string }) {
  return (
    <View style={styles.metricPreview}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{value}</Text>
      </View>
      <View style={styles.metricTrack}>
        <MotiView
          from={{ width: '0%' }}
          animate={{ width: percent }}
          transition={{ type: 'timing', duration: 900, delay: 260 }}
          style={styles.metricFill}
        />
      </View>
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
    gap: spacing.md,
  },
  navbarMobile: { flexDirection: 'column', alignItems: 'stretch', gap: spacing.sm },
  brandArea: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, minWidth: 194 },
  brandAreaMobile: { minWidth: 0, width: '100%', justifyContent: 'flex-start' },
  brandCopy: { flexShrink: 1 },
  logoMark: { width: 42, height: 42, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.36)' },
  logoMarkPhone: { width: 38, height: 38, borderRadius: 14 },
  brandName: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 16, letterSpacing: 2.8 },
  brandNamePhone: { fontSize: 15, letterSpacing: 2.2 },
  brandCaption: { marginTop: 2, fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 10, letterSpacing: 0.4 },
  brandCaptionPhone: { fontSize: 9 },
  navLinks: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end', gap: spacing.sm, paddingLeft: spacing.md, paddingRight: spacing.md },
  navLinksMobile: { justifyContent: 'flex-start', paddingLeft: 0, paddingRight: spacing.lg, paddingVertical: spacing.xs },
  navLink: { minHeight: 38, paddingHorizontal: spacing.md, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  navLinkPhone: { minHeight: 34, paddingHorizontal: spacing.sm },
  navLinkText: { fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 12 },
  navLinkTextPhone: { fontSize: 11 },
  navCta: { minHeight: 38, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, ...shadows.cyanGlow },
  navCtaPhone: { minHeight: 36, paddingHorizontal: spacing.md },
  navCtaText: { fontFamily: fonts.bodyBold, color: colors.textPrimary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  navCtaTextPhone: { fontSize: 11, letterSpacing: 0.2 },
  loginButton: { minHeight: 38, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  loginButtonPhone: { paddingHorizontal: spacing.md, minHeight: 36 },
  loginButtonText: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  userBadge: { minHeight: 42, paddingHorizontal: spacing.md, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.surfaceElevated, borderWidth: 1, borderColor: 'rgba(0,174,239,0.34)' },
  userBadgeName: { fontFamily: fonts.bodyBold, color: colors.textPrimary, fontSize: 12, maxWidth: 150 },
  userBadgeNamePhone: { maxWidth: 110 },
  userBadgeStatus: { fontFamily: fonts.bodyMedium, color: colors.accent, fontSize: 10, marginTop: 1, textTransform: 'uppercase', letterSpacing: 0.5 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  content: { paddingBottom: spacing.huge },
  heroSection: { width: '100%', maxWidth: 1180, alignSelf: 'center', flexDirection: 'row', gap: spacing.xxl, alignItems: 'center', flexWrap: 'wrap' },
  heroSectionMobile: { flexDirection: 'column', alignItems: 'stretch', gap: spacing.xl },
  heroCopy: { flex: 1, minWidth: 310 },
  fullWidth: { width: '100%', maxWidth: '100%', minWidth: 0, flexBasis: '100%', flexGrow: 0, flexShrink: 0 },
  fullButton: { width: '100%' },
  heroBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.32)', marginBottom: spacing.xl },
  heroBadgePhone: { borderRadius: radius.lg, alignItems: 'flex-start' },
  heroBadgeText: { flexShrink: 1, fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 12, lineHeight: 18, letterSpacing: 0.3 },
  heroTitle: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 48, lineHeight: 54, letterSpacing: -1.8 },
  heroTitleMobile: { fontSize: 38, lineHeight: 44, letterSpacing: -1.1 },
  heroTitlePhone: { fontSize: 30, lineHeight: 36, letterSpacing: -0.8 },
  heroSubtitle: { marginTop: spacing.lg, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 16, lineHeight: 26, maxWidth: 680 },
  heroSubtitlePhone: { fontSize: 14, lineHeight: 22 },
  heroActions: { marginTop: spacing.xxl, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.lg },
  actionsMobile: { flexDirection: 'column', alignItems: 'stretch', gap: spacing.md },
  secondaryCta: { minHeight: 56, paddingHorizontal: spacing.xl, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.glass, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  secondaryCtaText: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 14 },
  microcopy: { marginTop: spacing.lg, fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 13, lineHeight: 20, maxWidth: 680 },
  authNotice: { marginTop: spacing.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.backgroundSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.34)', flexDirection: 'row', alignItems: 'center', gap: spacing.sm, maxWidth: 680 },
  authNoticeText: { flex: 1, fontFamily: fonts.bodySemiBold, color: colors.silver, fontSize: 13, lineHeight: 20 },
  statsGrid: { marginTop: spacing.xxl, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  singleColumnGrid: { flexDirection: 'column', alignItems: 'stretch' },
  statCard: { flexGrow: 1, minWidth: 150, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  statValue: { marginTop: spacing.md, fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 22 },
  statLabel: { marginTop: 2, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 12 },
  heroVisualWrapper: { flex: 0.92, minWidth: 310, borderRadius: radius.xl, ...shadows.card },
  heroVisual: { borderRadius: radius.xl, padding: spacing.xl, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  heroVisualPhone: { padding: spacing.lg, borderRadius: radius.lg },
  visualHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  visualHeaderPhone: { alignItems: 'flex-start' },
  visualTitleBlock: { flex: 1 },
  visualKicker: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' },
  visualTitle: { marginTop: 4, fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 24 },
  visualTitlePhone: { fontSize: 20, lineHeight: 26 },
  livePill: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.accentSoft },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent },
  liveText: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 11, letterSpacing: 1 },
  searchPreviewCard: { marginTop: spacing.xl, borderRadius: radius.lg, padding: spacing.lg, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border, gap: spacing.md },
  searchPreviewLabel: { fontFamily: fonts.bodyBold, color: colors.textSecondary, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 },
  searchPreviewRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  searchPreviewText: { flexShrink: 1, fontFamily: fonts.bodySemiBold, color: colors.textPrimary, fontSize: 15 },
  visualBars: { marginTop: spacing.xl, gap: spacing.lg },
  metricPreview: { gap: spacing.sm },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  metricLabel: { flexShrink: 1, fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  metricValue: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 12 },
  metricTrack: { height: 10, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.08)' },
  metricFill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.accent },
  quickAccessSection: { width: '100%', maxWidth: 1180, alignSelf: 'center' },
  sectionKicker: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: spacing.sm },
  sectionTitle: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 32, lineHeight: 40, letterSpacing: -0.9, maxWidth: 900 },
  sectionTitlePhone: { fontSize: 25, lineHeight: 31 },
  sectionDescription: { marginTop: spacing.md, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 24, maxWidth: 860 },
  quickAccessGrid: { marginTop: spacing.xl, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg },
  quickAccessPressable: { flex: 1, minWidth: 250 },
  quickAccessCard: { minHeight: 230, borderRadius: radius.lg, padding: spacing.xl, borderWidth: 1, borderColor: colors.border },
  quickAccessCardPhone: { minHeight: 0, padding: spacing.lg },
  quickAccessIcon: { width: 54, height: 54, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, marginBottom: spacing.lg },
  quickAccessTitle: { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 22 },
  quickAccessDescription: { marginTop: spacing.sm, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
  quickAccessFooter: { marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  quickAccessLink: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 13 },
  comparePanel: { width: '100%', maxWidth: 1180, alignSelf: 'center', borderRadius: radius.xl, padding: spacing.xxl, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  comparePanelPhone: { padding: spacing.lg, borderRadius: radius.lg },
  compareKicker: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5 },
  compareTitle: { marginTop: spacing.sm, fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 32, lineHeight: 40 },
  compareTitlePhone: { fontSize: 24, lineHeight: 31 },
  compareDescription: { marginTop: spacing.md, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 24, maxWidth: 820 },
  compareActions: { marginTop: spacing.xl, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.lg },
  faqShortcut: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: radius.pill, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  faqShortcutText: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 14 },
  footerShell: { width: '100%', maxWidth: 1180, alignSelf: 'center', borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.xl, marginTop: spacing.lg, ...shadows.card },
  footerShellPhone: { padding: spacing.lg, borderRadius: radius.lg },
  footerTop: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxl },
  footerTopMobile: { flexDirection: 'column', gap: spacing.xl },
  footerBrandBlock: { flex: 1, minWidth: 280, maxWidth: '100%' },
  footerLogoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  footerLogoRowPhone: { alignItems: 'flex-start' },
  footerLogoMark: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.36)' },
  footerBrand: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 18, letterSpacing: 3 },
  footerSubBrand: { fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 11, marginTop: 2 },
  footerText: { marginTop: spacing.lg, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 14, lineHeight: 23, maxWidth: 460, flexShrink: 1 },
  footerBadges: { marginTop: spacing.lg, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footerBadge: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.28)' },
  footerBadgeText: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 11 },
  footerGrid: { flex: 1.2, minWidth: 320, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: spacing.xl },
  footerGridMobile: { width: '100%', maxWidth: '100%', minWidth: 0, flexBasis: '100%', flexGrow: 0, flexShrink: 0, flexDirection: 'column', alignItems: 'stretch', gap: spacing.lg },
  footerColumn: { minWidth: 150, gap: spacing.sm },
  footerColumnMobile: { width: '100%', maxWidth: '100%', minWidth: 0 },
  footerColumnTitle: { fontFamily: fonts.bodyBold, color: colors.textPrimary, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  footerLink: { fontFamily: fonts.bodySemiBold, color: colors.accent, fontSize: 13, lineHeight: 22 },
  footerMutedLink: { fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 13, lineHeight: 22 },
  externalLinkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  footerDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xl },
  footerBottom: { gap: spacing.sm },
  footerLegal: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 13, lineHeight: 20 },
  footerDisclaimer: { fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 12, lineHeight: 19 },
});
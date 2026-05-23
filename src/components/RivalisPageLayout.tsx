import React, { useState } from 'react';
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, ExternalLink, LockKeyhole, Radar } from 'lucide-react-native';

import type { RootStackParamList } from '../@types/navigation';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { useResponsive } from '../theme/responsive';
import { LoginModal } from './LoginModal';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

type RivalisPageLayoutProps = {
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
  showBackButton?: boolean;
};

const pageLinks: Array<{ label: string; route: keyof RootStackParamList }> = [
  { label: 'Uso interno', route: 'UsoInterno' },
  { label: 'Fluxo', route: 'Fluxo' },
  { label: 'Análises', route: 'Analises' },
  { label: 'FAQ', route: 'FAQ' },
];

export function RivalisPageLayout({ kicker, title, description, children, showBackButton = true }: RivalisPageLayoutProps) {
  const navigation = useNavigation<Navigation>();
  const { isPhone, isMobile, pagePadding, sectionGap } = useResponsive();
  const [loginVisible, setLoginVisible] = useState(false);

  const openExternal = (url: string) => {
    Linking.openURL(url).catch(() => undefined);
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
                <Text style={[styles.brandCaption, isPhone && styles.brandCaptionPhone]}>Internal Vehicle Intelligence</Text>
              </View>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.navLinks, isMobile && styles.navLinksMobile]}>
              {pageLinks.map((item) => (
                <Pressable key={item.route} onPress={() => navigation.navigate(item.route)} style={({ pressed }) => [styles.navLink, pressed && styles.pressed]}>
                  <Text style={styles.navLinkText}>{item.label}</Text>
                </Pressable>
              ))}
              <Pressable onPress={() => navigation.navigate('Home')} style={({ pressed }) => [styles.navCta, pressed && styles.pressed]}>
                <Text style={styles.navCtaText}>Comparar agora</Text>
              </Pressable>
              <Pressable onPress={() => setLoginVisible(true)} style={({ pressed }) => [styles.loginButton, pressed && styles.pressed]}>
                <LockKeyhole size={14} color={colors.silver} strokeWidth={2.4} />
                <Text style={styles.loginButtonText}>Login</Text>
              </Pressable>
            </ScrollView>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.content, { paddingHorizontal: pagePadding, paddingBottom: sectionGap }]}>
            <View style={[styles.hero, { paddingTop: isPhone ? spacing.xl : spacing.xxl, paddingBottom: isPhone ? spacing.xl : spacing.xxl }]}>
              {showBackButton ? (
                <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
                  <ArrowLeft size={18} color={colors.textPrimary} strokeWidth={2.6} />
                  <Text style={styles.backButtonText}>Voltar</Text>
                </Pressable>
              ) : null}

              <Text style={styles.kicker}>{kicker}</Text>
              <Text style={[styles.title, isMobile && styles.titleMobile, isPhone && styles.titlePhone]}>{title}</Text>
              <Text style={[styles.description, isPhone && styles.descriptionPhone]}>{description}</Text>
            </View>

            {children}

            <LinearGradient colors={gradients.premiumPanel} style={[styles.footerShell, isPhone && styles.footerShellPhone]}>
              <View style={[styles.footerTop, isMobile && styles.footerTopMobile]}>
                <View style={[styles.footerBrandBlock, isMobile && styles.fullWidth]}>
                  <View style={styles.footerLogoRow}>
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
                  <View style={[styles.footerColumn, isPhone && styles.fullWidth]}>
                    <Text style={styles.footerColumnTitle}>Navegação</Text>
                    <Pressable onPress={() => navigation.navigate('Home')}><Text style={styles.footerLink}>Página inicial</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('UsoInterno')}><Text style={styles.footerLink}>Uso interno</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('Fluxo')}><Text style={styles.footerLink}>Fluxo</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('Analises')}><Text style={styles.footerLink}>Análises</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('FAQ')}><Text style={styles.footerLink}>FAQ</Text></Pressable>
                  </View>

                  <View style={[styles.footerColumn, isPhone && styles.fullWidth]}>
                    <Text style={styles.footerColumnTitle}>Aplicações</Text>
                    <Text style={styles.footerMutedLink}>Treinamento de produto</Text>
                    <Text style={styles.footerMutedLink}>Benchmarking competitivo</Text>
                    <Text style={styles.footerMutedLink}>Apoio comercial</Text>
                    <Text style={styles.footerMutedLink}>Consulta técnica rápida</Text>
                  </View>

                  <View style={[styles.footerColumn, isPhone && styles.fullWidth]}>
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
                    <Pressable onPress={() => navigation.navigate('Esgotado')}><Text style={styles.footerLink}>Lista de acesso</Text></Pressable>
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
      <LoginModal visible={loginVisible} onClose={() => setLoginVisible(false)} />
    </View>
  );
}

export function InfoCard({ title, description, icon: Icon }: { title: string; description: string; icon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }> }) {
  const { isPhone } = useResponsive();

  return (
    <LinearGradient colors={gradients.card} style={[styles.infoCard, isPhone && styles.fullWidth, isPhone && styles.infoCardPhone]}>
      {Icon ? (
        <View style={styles.cardIconBox}>
          <Icon size={24} color={colors.accent} strokeWidth={2.5} />
        </View>
      ) : null}
      <Text style={styles.infoCardTitle}>{title}</Text>
      <Text style={styles.infoCardDescription}>{description}</Text>
    </LinearGradient>
  );
}

export function PageSection({ kicker, title, description, children }: { kicker?: string; title: string; description?: string; children?: React.ReactNode }) {
  const { isPhone, sectionGap } = useResponsive();

  return (
    <View style={[styles.pageSection, { marginBottom: sectionGap }]}>
      {kicker ? <Text style={styles.sectionKicker}>{kicker}</Text> : null}
      <Text style={[styles.sectionTitle, isPhone && styles.sectionTitlePhone]}>{title}</Text>
      {description ? <Text style={styles.sectionDescription}>{description}</Text> : null}
      {children ? <View style={styles.sectionChildren}>{children}</View> : null}
    </View>
  );
}

export function BulletRow({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bulletDot} />
      <Text style={styles.bulletText}>{text}</Text>
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
  brandAreaMobile: { minWidth: 0, width: '100%' },
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
  navLinkText: { fontFamily: fonts.bodySemiBold, color: colors.textSecondary, fontSize: 12 },
  navCta: { minHeight: 38, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accent, ...shadows.cyanGlow },
  navCtaText: { fontFamily: fonts.bodyBold, color: colors.textPrimary, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  loginButton: { minHeight: 38, paddingHorizontal: spacing.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border },
  loginButtonText: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.4 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  content: { paddingBottom: spacing.huge },
  hero: { width: '100%', maxWidth: 1180, alignSelf: 'center' },
  backButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.glass, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl },
  backButtonText: { fontFamily: fonts.bodySemiBold, color: colors.silver, fontSize: 13 },
  kicker: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.8, marginBottom: spacing.md },
  title: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 44, lineHeight: 52, letterSpacing: -1.4, maxWidth: 980 },
  titleMobile: { fontSize: 35, lineHeight: 42 },
  titlePhone: { fontSize: 27, lineHeight: 34, letterSpacing: -0.7 },
  description: { marginTop: spacing.lg, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 16, lineHeight: 26, maxWidth: 860 },
  descriptionPhone: { fontSize: 14, lineHeight: 22 },
  pageSection: { width: '100%', maxWidth: 1180, alignSelf: 'center' },
  sectionKicker: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: spacing.sm },
  sectionTitle: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 30, lineHeight: 38, letterSpacing: -0.8 },
  sectionTitlePhone: { fontSize: 24, lineHeight: 31 },
  sectionDescription: { marginTop: spacing.md, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 24, maxWidth: 880 },
  sectionChildren: { marginTop: spacing.xl },
  infoCard: { flex: 1, minWidth: 250, borderRadius: radius.lg, padding: spacing.xl, borderWidth: 1, borderColor: colors.border },
  infoCardPhone: { padding: spacing.lg },
  fullWidth: { width: '100%', minWidth: 0, flex: 0 },
  cardIconBox: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, marginBottom: spacing.lg },
  infoCardTitle: { fontFamily: fonts.heading, color: colors.textPrimary, fontSize: 20, lineHeight: 26 },
  infoCardDescription: { marginTop: spacing.sm, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start', marginBottom: spacing.md },
  bulletDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.accent, marginTop: 6 },
  bulletText: { flex: 1, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 15, lineHeight: 23 },
  footerShell: { width: '100%', maxWidth: 1180, alignSelf: 'center', borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.xl, marginTop: spacing.lg, ...shadows.card },
  footerShellPhone: { padding: spacing.lg, borderRadius: radius.lg },
  footerTop: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xxl },
  footerTopMobile: { flexDirection: 'column', gap: spacing.xl },
  footerBrandBlock: { flex: 1, minWidth: 280 },
  footerLogoRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  footerLogoMark: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.36)' },
  footerBrand: { fontFamily: fonts.headingBold, color: colors.textPrimary, fontSize: 18, letterSpacing: 3 },
  footerSubBrand: { fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 11, marginTop: 2 },
  footerText: { marginTop: spacing.lg, fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 14, lineHeight: 23, maxWidth: 460 },
  footerBadges: { marginTop: spacing.lg, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footerBadge: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.accentSoft, borderWidth: 1, borderColor: 'rgba(0,174,239,0.28)' },
  footerBadgeText: { fontFamily: fonts.bodyBold, color: colors.accent, fontSize: 11 },
  footerGrid: { flex: 1.2, minWidth: 320, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xl },
  footerGridMobile: { width: '100%', minWidth: 0, flex: 0, gap: spacing.lg },
  footerColumn: { minWidth: 150, gap: spacing.sm },
  footerColumnTitle: { fontFamily: fonts.bodyBold, color: colors.textPrimary, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  footerLink: { fontFamily: fonts.bodySemiBold, color: colors.accent, fontSize: 13, lineHeight: 22 },
  footerMutedLink: { fontFamily: fonts.bodyMedium, color: colors.textSecondary, fontSize: 13, lineHeight: 22 },
  externalLinkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  footerDivider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xl },
  footerBottom: { gap: spacing.sm },
  footerLegal: { fontFamily: fonts.bodyBold, color: colors.silver, fontSize: 13, lineHeight: 20 },
  footerDisclaimer: { fontFamily: fonts.bodyMedium, color: colors.textMuted, fontSize: 12, lineHeight: 19 },
});
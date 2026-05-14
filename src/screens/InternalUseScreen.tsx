import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BriefcaseBusiness, ClipboardCheck, GraduationCap, Headset, Radar, ShieldCheck, Users } from 'lucide-react-native';

import { BulletRow, InfoCard, PageSection, RivalisPageLayout } from '../components/RivalisPageLayout';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

const audiences = [
  {
    title: 'Consultores e atendimento',
    description: 'Consulta rápida para responder dúvidas comuns sobre posicionamento técnico de modelos Ford frente a concorrentes diretos.',
    icon: Headset,
  },
  {
    title: 'Treinamento de produto',
    description: 'Material visual para explicar potência, torque, categoria e diferenciais de forma padronizada para equipes.',
    icon: GraduationCap,
  },
  {
    title: 'Marketing e produto',
    description: 'Base de apoio para enxergar gaps competitivos, destacar forças e preparar narrativas técnicas com mais contexto.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Gestores de operação',
    description: 'Visão objetiva para alinhar equipes, reduzir improviso e transformar comparação técnica em leitura operacional.',
    icon: Users,
  },
];

const usageMoments = [
  'Antes de uma reunião interna sobre posicionamento de produto.',
  'Durante treinamentos de equipe, com leitura visual dos principais indicadores.',
  'Na preparação de argumentação técnica sobre Ford versus concorrentes.',
  'Em consultas rápidas para esclarecer diferenças de potência e torque.',
  'Em ciclos de feedback para melhorar a base de dados e os critérios comparativos.',
];

export function InternalUseScreen() {
  return (
    <RivalisPageLayout
      kicker="Uso interno"
      title="Rivalis como ferramenta de trabalho para equipes Ford."
      description="Esta página detalha o posicionamento B2E do Rivalis: uma solução de apoio interno para benchmarking, treinamento, atendimento e leitura competitiva diária. O foco não é o cliente final escolhendo um carro, mas o colaborador usando dados para trabalhar melhor."
    >
      <PageSection
        kicker="Reposicionamento"
        title="De landing para consumidor final para cockpit interno de comparação."
        description="O Rivalis passa a ser apresentado como uma camada visual que organiza informações técnicas e ajuda colaboradores a entenderem rapidamente como modelos Ford se posicionam contra concorrentes relevantes."
      >
        <LinearGradient colors={gradients.premiumPanel} style={styles.featurePanel}>
          <View style={styles.featureIcon}>
            <Radar size={30} color={colors.accent} strokeWidth={2.6} />
          </View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>O objetivo é apoiar o trabalho, não substituir material oficial.</Text>
            <Text style={styles.featureText}>
              O Rivalis funciona como uma interface de consulta e apresentação. Ele pode resumir dados, destacar diferenças e facilitar a interpretação, mas as informações precisam ser validadas por fontes oficiais antes de uso corporativo real.
            </Text>
          </View>
        </LinearGradient>
      </PageSection>

      <PageSection kicker="Quem usa" title="Times que podem se beneficiar do MVP.">
        <View style={styles.grid}>
          {audiences.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </View>
      </PageSection>

      <PageSection
        kicker="Momentos de uso"
        title="Onde o Rivalis entra no dia a dia."
        description="A proposta é tornar o acesso à comparação mais rápido, visual e consistente, principalmente quando o colaborador precisa transformar ficha técnica em argumento ou contexto."
      >
        <LinearGradient colors={gradients.card} style={styles.bulletPanel}>
          {usageMoments.map((item) => (
            <BulletRow key={item} text={item} />
          ))}
        </LinearGradient>
      </PageSection>

      <PageSection kicker="Governança" title="Cuidados antes de uma implantação real.">
        <View style={styles.grid}>
          <InfoCard title="Base validada" description="Dados de potência, torque, versões e categorias devem ser revisados periodicamente por uma fonte confiável." icon={ClipboardCheck} />
          <InfoCard title="Uso complementar" description="A ferramenta apoia treinamentos e consultas, mas não substitui catálogos, materiais oficiais ou políticas internas." icon={ShieldCheck} />
        </View>
      </PageSection>
    </RivalisPageLayout>
  );
}

const styles = StyleSheet.create({
  featurePanel: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
    ...shadows.card,
  },
  featureIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.34)',
  },
  featureCopy: {
    flex: 1,
    minWidth: 260,
  },
  featureTitle: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 26,
    lineHeight: 33,
  },
  featureText: {
    marginTop: spacing.md,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  bulletPanel: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

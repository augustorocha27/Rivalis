import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart3, Car, ClipboardList, FileSearch, Gauge, MessagesSquare, Radar, Route, Trophy } from 'lucide-react-native';

import { BulletRow, InfoCard, PageSection, RivalisPageLayout } from '../components/RivalisPageLayout';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

const steps = [
  {
    label: '01',
    title: 'Escolha o modelo Ford de referência',
    description: 'O colaborador define qual modelo será analisado, como Ranger, Territory, Bronco Sport ou outro veículo da linha em foco.',
    icon: Car,
  },
  {
    label: '02',
    title: 'Informe indicadores técnicos básicos',
    description: 'Potência, torque e categoria entram como primeira camada do MVP para gerar uma comparação rápida e objetiva.',
    icon: Gauge,
  },
  {
    label: '03',
    title: 'Cruze com concorrentes diretos',
    description: 'A base organiza rivais por proposta, segmento e uso, evitando comparações aleatórias que não ajudam no trabalho.',
    icon: Radar,
  },
  {
    label: '04',
    title: 'Interprete o resultado visual',
    description: 'Cards, barras e percentuais mostram onde o modelo Ford se destaca e onde precisa de contexto adicional.',
    icon: BarChart3,
  },
  {
    label: '05',
    title: 'Transforme em argumento',
    description: 'A leitura técnica vira insumo para treinamento, reunião, atendimento e alinhamento de discurso interno.',
    icon: MessagesSquare,
  },
];

const checkpoints = [
  'O modelo de referência está correto?',
  'A versão comparada é equivalente em segmento e proposta?',
  'Os dados de potência e torque foram revisados?',
  'A leitura final diferencia fato técnico de argumento comercial?',
  'O colaborador sabe quando consultar material oficial complementar?',
];

export function WorkflowScreen() {
  return (
    <RivalisPageLayout
      kicker="Fluxo"
      title="Da ficha técnica ao argumento de trabalho em poucos passos."
      description="O fluxo do Rivalis foi pensado para reduzir atrito: o colaborador informa uma referência Ford, visualiza concorrentes e usa a comparação como apoio para decisões, conversas e treinamentos internos."
    >
      <PageSection kicker="Processo" title="Fluxo principal de uso.">
        <View style={styles.timeline}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <LinearGradient key={step.label} colors={gradients.card} style={styles.stepCard}>
                <View style={styles.stepNumberBox}>
                  <Text style={styles.stepNumber}>{step.label}</Text>
                </View>
                <View style={styles.stepIconBox}>
                  <Icon size={24} color={colors.accent} strokeWidth={2.5} />
                </View>
                <View style={styles.stepCopy}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </LinearGradient>
            );
          })}
        </View>
      </PageSection>

      <PageSection
        kicker="Checklist"
        title="Validação rápida antes de usar uma comparação."
        description="Como a ferramenta é um MVP, a leitura visual precisa ser acompanhada de critérios claros para evitar conclusões fora de contexto."
      >
        <LinearGradient colors={gradients.premiumPanel} style={styles.checklistCard}>
          {checkpoints.map((item) => (
            <BulletRow key={item} text={item} />
          ))}
        </LinearGradient>
      </PageSection>

      <PageSection kicker="Saídas esperadas" title="O que o colaborador deve conseguir ao final do fluxo.">
        <View style={styles.grid}>
          <InfoCard title="Resumo competitivo" description="Saber em poucos segundos quais concorrentes estão próximos e onde há vantagem técnica." icon={FileSearch} />
          <InfoCard title="Narrativa mais clara" description="Transformar indicadores em uma explicação simples para treinamento, atendimento ou reunião interna." icon={ClipboardList} />
          <InfoCard title="Próximo passo definido" description="Identificar se o caso exige material oficial, revisão de dados ou aprofundamento de produto." icon={Route} />
          <InfoCard title="Leitura visual compartilhável" description="Usar cards e barras como base para discussões rápidas entre equipes." icon={Trophy} />
        </View>
      </PageSection>
    </RivalisPageLayout>
  );
}

const styles = StyleSheet.create({
  timeline: {
    gap: spacing.lg,
  },
  stepCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.lg,
    ...shadows.card,
  },
  stepNumberBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  stepNumber: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 20,
  },
  stepIconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  stepCopy: {
    flex: 1,
    minWidth: 260,
  },
  stepTitle: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 21,
  },
  stepDescription: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  checklistCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
});

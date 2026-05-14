import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart3, DatabaseZap, Gauge, LineChart, Route, ShieldAlert, SlidersHorizontal, Target, Zap } from 'lucide-react-native';

import { BulletRow, InfoCard, PageSection, RivalisPageLayout } from '../components/RivalisPageLayout';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

const indicators = [
  {
    title: 'Potência',
    value: 'hp / cv',
    description: 'Ajuda a entender força máxima, desempenho percebido e comparação de posicionamento técnico.',
    icon: Gauge,
  },
  {
    title: 'Torque',
    value: 'Nm',
    description: 'Ajuda a explicar força disponível, retomada, uso com carga e sensação de resposta em diferentes contextos.',
    icon: Zap,
  },
  {
    title: 'Categoria',
    value: 'segmento',
    description: 'Evita comparações sem sentido, agrupando veículos por proposta, uso e perfil competitivo.',
    icon: Target,
  },
  {
    title: 'Diferença percentual',
    value: '+ / - %',
    description: 'Transforma números absolutos em leitura rápida de vantagem, equilíbrio ou ponto de atenção.',
    icon: BarChart3,
  },
];

const interpretations = [
  'Vantagem técnica: quando o modelo Ford supera ou empata indicadores importantes dentro do segmento.',
  'Ponto de contexto: quando o concorrente tem número superior, mas a leitura depende de versão, proposta ou uso.',
  'Equilíbrio competitivo: quando a diferença é pequena e o argumento deve considerar outros fatores do produto.',
  'Alerta de dados: quando a comparação exige validação, revisão de versão ou fonte oficial antes de ser utilizada.',
];

export function AnalysesScreen() {
  return (
    <RivalisPageLayout
      kicker="Análises"
      title="Como o Rivalis transforma dados automotivos em leitura operacional."
      description="Esta página aprofunda a lógica de análise do MVP: indicadores técnicos, visualização em cards, interpretação de diferenças percentuais e limites da ferramenta para uso interno."
    >
      <PageSection kicker="Indicadores" title="Métricas principais do MVP.">
        <View style={styles.grid}>
          {indicators.map((item) => {
            const Icon = item.icon;
            return (
              <LinearGradient key={item.title} colors={gradients.card} style={styles.indicatorCard}>
                <View style={styles.indicatorHeader}>
                  <View style={styles.iconBox}>
                    <Icon size={24} color={colors.accent} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.indicatorValue}>{item.value}</Text>
                </View>
                <Text style={styles.indicatorTitle}>{item.title}</Text>
                <Text style={styles.indicatorDescription}>{item.description}</Text>
              </LinearGradient>
            );
          })}
        </View>
      </PageSection>

      <PageSection
        kicker="Visualização"
        title="Por que cards e barras ajudam no uso corporativo."
        description="A ideia não é substituir uma planilha completa. A proposta é criar uma camada de leitura rápida, boa para consulta, apresentação e treinamento."
      >
        <LinearGradient colors={gradients.premiumPanel} style={styles.visualPanel}>
          <View style={styles.visualColumn}>
            <LineChart size={36} color={colors.accent} strokeWidth={2.4} />
            <Text style={styles.visualTitle}>Leitura imediata</Text>
            <Text style={styles.visualText}>O colaborador entende rapidamente se há vantagem, equilíbrio ou ponto de atenção.</Text>
          </View>
          <View style={styles.visualColumn}>
            <SlidersHorizontal size={36} color={colors.accent} strokeWidth={2.4} />
            <Text style={styles.visualTitle}>Comparação padronizada</Text>
            <Text style={styles.visualText}>A mesma lógica de cards reduz interpretações diferentes entre equipes.</Text>
          </View>
          <View style={styles.visualColumn}>
            <DatabaseZap size={36} color={colors.accent} strokeWidth={2.4} />
            <Text style={styles.visualTitle}>Base evolutiva</Text>
            <Text style={styles.visualText}>O MVP pode começar com poucos indicadores e evoluir para preço, versões, consumo e equipamentos.</Text>
          </View>
        </LinearGradient>
      </PageSection>

      <PageSection kicker="Interpretação" title="Como ler os resultados sem perder contexto.">
        <LinearGradient colors={gradients.card} style={styles.bulletPanel}>
          {interpretations.map((item) => (
            <BulletRow key={item} text={item} />
          ))}
        </LinearGradient>
      </PageSection>

      <PageSection kicker="Limites" title="O que precisa ficar claro na apresentação.">
        <View style={styles.grid}>
          <InfoCard title="MVP demonstrativo" description="A lógica atual mostra o potencial da experiência. Para uso real, a base deve ser validada e governada." icon={ShieldAlert} />
          <InfoCard title="Não é recomendador de compra" description="A solução apoia colaboradores com análise técnica e competitiva, não substitui decisão comercial, estratégia ou material oficial." icon={Route} />
        </View>
      </PageSection>
    </RivalisPageLayout>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  indicatorCard: {
    flex: 1,
    minWidth: 250,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  indicatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  indicatorValue: {
    fontFamily: fonts.headingBold,
    color: colors.accent,
    fontSize: 18,
  },
  indicatorTitle: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 22,
  },
  indicatorDescription: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  visualPanel: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  visualColumn: {
    flex: 1,
    minWidth: 240,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
  },
  visualTitle: {
    marginTop: spacing.lg,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 20,
  },
  visualText: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  bulletPanel: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

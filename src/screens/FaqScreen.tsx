import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown, ChevronUp, Database, FileCheck2, HelpCircle, LockKeyhole, MonitorSmartphone, Users } from 'lucide-react-native';

import { InfoCard, PageSection, RivalisPageLayout } from '../components/RivalisPageLayout';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';

const faqs = [
  {
    question: 'O Rivalis é voltado para cliente final?',
    answer: 'Nesta proposta, não. O Rivalis foi reposicionado como uma ferramenta B2E para colaboradores usarem no dia a dia de trabalho, especialmente em benchmarking, treinamento e apoio à argumentação técnica.',
  },
  {
    question: 'Como um funcionário da Ford usaria o Rivalis?',
    answer: 'O colaborador informa um modelo Ford de referência e visualiza concorrentes diretos com dados como potência, torque, categoria e diferenças percentuais. A leitura pode apoiar reuniões, treinamentos e consultas rápidas.',
  },
  {
    question: 'Quais áreas poderiam usar essa ferramenta?',
    answer: 'Consultores, times de produto, treinamento, marketing, operações, experiência do cliente e equipes que precisam consultar ou explicar posicionamento competitivo de forma rápida.',
  },
  {
    question: 'Os dados dos carros são oficiais?',
    answer: 'Na fase MVP, os dados são demonstrativos. Para uso corporativo real, a base deve ser validada por fontes oficiais, revisada periodicamente e atualizada conforme versões e lançamentos.',
  },
  {
    question: 'O Rivalis substitui materiais oficiais?',
    answer: 'Não. Ele funciona como uma camada visual de apoio. Catálogos, fichas oficiais, políticas internas e treinamentos formais continuam sendo fontes principais para decisões corporativas.',
  },
  {
    question: 'O comparador pode evoluir além de potência e torque?',
    answer: 'Sim. Futuramente, ele pode incluir preço, versões, consumo, dimensões, capacidade de carga, equipamentos, segurança, custo de manutenção e filtros por segmento.',
  },
  {
    question: 'Funciona no celular e no desktop?',
    answer: 'Sim. A interface foi pensada para uso responsivo, permitindo consulta em treinamentos, reuniões, apresentações e no atendimento do dia a dia.',
  },
  {
    question: 'A estética azul significa parceria oficial?',
    answer: 'Não. A estética é apenas uma direção visual automotiva inspirada em tons de azul e tecnologia. O MVP não usa logotipo oficial e não comunica parceria formal.',
  },
];

const highlights = [
  {
    title: 'Uso B2E',
    description: 'Projetado para colaboradores, não para consumidor final em jornada de compra.',
    icon: Users,
  },
  {
    title: 'Base governável',
    description: 'Pode evoluir com validação de dados, fontes oficiais e atualização periódica.',
    icon: Database,
  },
  {
    title: 'Multidispositivo',
    description: 'Interface adaptada para desktop, tablet e celular.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Uso responsável',
    description: 'Complementa materiais oficiais e ajuda a padronizar a leitura competitiva.',
    icon: FileCheck2,
  },
];

export function FaqScreen() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (question: string) => {
    setOpenItems((current) => ({ ...current, [question]: !current[question] }));
  };

  return (
    <RivalisPageLayout
      kicker="FAQ"
      title="Dúvidas comuns sobre o Rivalis como ferramenta interna."
      description="Esta página concentra respostas para apresentar o MVP com mais segurança: objetivo, público interno, dados, limitações, evolução e uso responsável."
    >
      <PageSection kicker="Resumo" title="Antes de apresentar o MVP, alinhe estes pontos.">
        <View style={styles.grid}>
          {highlights.map((item) => (
            <InfoCard key={item.title} title={item.title} description={item.description} icon={item.icon} />
          ))}
        </View>
      </PageSection>

      <PageSection kicker="Perguntas frequentes" title="Respostas rápidas e editáveis.">
        <View style={styles.faqList}>
          {faqs.map((item) => {
            const isOpen = openItems[item.question];
            return (
              <LinearGradient key={item.question} colors={gradients.card} style={styles.faqItem}>
                <Pressable onPress={() => toggle(item.question)} style={({ pressed }) => [styles.faqQuestionRow, pressed && styles.pressed]}>
                  <View style={styles.questionIcon}>
                    <HelpCircle size={20} color={colors.accent} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.faqQuestion}>{item.question}</Text>
                  {isOpen ? <ChevronUp size={20} color={colors.accent} /> : <ChevronDown size={20} color={colors.accent} />}
                </Pressable>
                {isOpen ? <Text style={styles.faqAnswer}>{item.answer}</Text> : null}
              </LinearGradient>
            );
          })}
        </View>
      </PageSection>

      <PageSection kicker="Segurança de mensagem" title="O que não prometer nesta fase.">
        <LinearGradient colors={gradients.premiumPanel} style={styles.warningCard}>
          <LockKeyhole size={32} color={colors.accent} strokeWidth={2.5} />
          <Text style={styles.warningTitle}>Evite prometer dados oficiais, recomendação de compra ou implantação corporativa pronta.</Text>
          <Text style={styles.warningText}>
            O discurso mais seguro é apresentar o Rivalis como MVP demonstrativo para validar experiência, utilidade, fluxo, visualização e governança de dados antes de qualquer adoção real.
          </Text>
        </LinearGradient>
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
  faqList: {
    gap: spacing.md,
  },
  faqItem: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  faqQuestionRow: {
    minHeight: 76,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  questionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  faqQuestion: {
    flex: 1,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 18,
    lineHeight: 24,
  },
  faqAnswer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingLeft: 74,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 23,
  },
  pressed: {
    opacity: 0.8,
  },
  warningCard: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  warningTitle: {
    marginTop: spacing.lg,
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 25,
    lineHeight: 32,
  },
  warningText: {
    marginTop: spacing.md,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
});

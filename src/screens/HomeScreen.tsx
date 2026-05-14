import React, { useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
  Clock3,
  Gauge,
  Layers3,
  LineChart,
  Mail,
  Play,
  Radar,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react-native';

import type { BattleResult, ReferenceVehicle } from '../@types/car';
import type { RootStackParamList } from '../@types/navigation';
import { AnimatedButton } from '../components/AnimatedButton';
import { BattleCard } from '../components/BattleCard';
import { VehicleSearchSheet } from '../components/VehicleSearchSheet';
import { colors, fonts, gradients, radius, shadows, spacing } from '../theme';
import { compareAgainstCompetitorCars } from '../utils/compareCars';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type SectionKey = 'topo' | 'sobre' | 'funciona' | 'detalhes' | 'faq' | 'comparar' | 'resultado';

const defaultReference: ReferenceVehicle = {
  name: 'Ford Ranger',
  powerHp: 210,
  torqueNm: 500,
};

export function HomeScreen() {
  const navigation = useNavigation<Navigation>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});
  const [reference, setReference] = useState<ReferenceVehicle>(defaultReference);
  const [results, setResults] = useState<BattleResult[]>([]);

  const hasResults = results.length > 0;

  const navLinks = useMemo(
    () => [
      { label: 'Uso interno', key: 'sobre' as SectionKey },
      { label: 'Fluxo', key: 'funciona' as SectionKey },
      { label: 'Análises', key: 'detalhes' as SectionKey },
      { label: 'FAQ', key: 'faq' as SectionKey },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { label: 'Concorrentes mapeados', value: '08', icon: Radar },
      { label: 'Indicadores de apoio', value: 'HP + Nm', icon: BarChart3 },
      { label: 'Uso no dia a dia', value: 'B2E', icon: Activity },
    ],
    [],
  );

  const painPoints = useMemo(
    () => [
      'Equipes precisam consultar vários materiais para responder perguntas técnicas sobre Ford versus concorrentes.',
      'Potência e torque aparecem como números soltos, mas nem sempre viram argumento claro para atendimento, treinamento ou benchmarking.',
      'Sem uma visão visual padronizada, cada colaborador compara de um jeito e a leitura competitiva perde consistência.',
    ],
    [],
  );

  const steps = useMemo(
    () => [
      {
        label: 'Passo 01',
        title: 'Informe o modelo Ford de referência',
        description: 'Insira modelo, ano, potência e torque do veículo que será usado na análise interna.',
        icon: SlidersHorizontal,
      },
      {
        label: 'Passo 02',
        title: 'Cruze com concorrentes diretos',
        description: 'O Rivalis organiza rivais por categoria, proposta e indicadores técnicos relevantes.',
        icon: Radar,
      },
      {
        label: 'Passo 03',
        title: 'Transforme dados em argumento',
        description: 'Use barras, diferenças percentuais e destaques para apoiar atendimento, treinamento e benchmarking.',
        icon: Trophy,
      },
    ],
    [],
  );

  const benefits = useMemo(
    () => [
      {
        title: 'Apoio para atendimento',
        description: 'Ajuda colaboradores a responder dúvidas comuns sobre concorrentes com mais velocidade e segurança.',
        icon: Clock3,
      },
      {
        title: 'Benchmark visual',
        description: 'Transforma potência e torque em barras comparativas fáceis de ler durante reuniões e treinamentos.',
        icon: BarChart3,
      },
      {
        title: 'Foco em rivais relevantes',
        description: 'Prioriza modelos que fazem sentido por segmento, proposta de uso e faixa de desempenho.',
        icon: Target,
      },
      {
        title: 'Interface corporativa premium',
        description: 'Visual azul escuro, cards modernos e linguagem de dashboard automotivo para uso profissional.',
        icon: Layers3,
      },
      {
        title: 'Mais consistência comercial',
        description: 'Padroniza a leitura técnica para que equipes diferentes trabalhem com a mesma base comparativa.',
        icon: ShieldCheck,
      },
      {
        title: 'Argumentação técnica clara',
        description: 'Converte ficha técnica em leitura objetiva: onde o modelo Ford se destaca e onde precisa de contexto.',
        icon: Gauge,
      },
    ],
    [],
  );

  const showcase = useMemo(
    () => [
      {
        title: 'Painel de Concorrência',
        description: 'Compare um modelo Ford com rivais diretos em uma interface clara e responsiva.',
        icon: LineChart,
      },
      {
        title: 'Leitura por Potência',
        description: 'Veja rapidamente a diferença de hp e onde ela pode virar argumento técnico.',
        icon: Gauge,
      },
      {
        title: 'Torque em Contexto',
        description: 'Entenda a força disponível para trabalho, retomada e uso urbano ou rodoviário.',
        icon: Zap,
      },
      {
        title: 'Resumo para Equipes',
        description: 'Use o resultado como apoio para conversas internas, treinamentos e preparação comercial.',
        icon: Route,
      },
    ],
    [],
  );

  const testimonials = useMemo(
    () => [
      {
        quote: 'Em vez de procurar dados em várias abas, eu consigo abrir uma comparação rápida e explicar o posicionamento do modelo com muito mais clareza.',
        name: 'Lucas M.',
        role: 'Consultor comercial automotivo',
      },
      {
        quote: 'A visualização por barras facilita o treinamento da equipe. O número deixa de ser só ficha técnica e vira argumento.',
        name: 'Rafael T.',
        role: 'Treinamento de produto',
      },
      {
        quote: 'Para benchmarking, o Rivalis ajuda a enxergar rapidamente onde o nosso modelo está forte e onde precisamos contextualizar melhor.',
        name: 'André P.',
        role: 'Análise de concorrência',
      },
      {
        quote: 'A proposta é perfeita para uso interno: simples, visual e direta para o dia a dia de quem precisa falar de carros com precisão.',
        name: 'Marina C.',
        role: 'Operações e experiência do cliente',
      },
    ],
    [],
  );

  const faqs = useMemo(
    () => [
      {
        question: 'O Rivalis é voltado para cliente final?',
        answer: 'Nesta proposta, não. A landing foi posicionada para uso B2E: colaboradores usando a ferramenta como apoio diário de análise e comparação.',
      },
      {
        question: 'Como a equipe usaria no trabalho?',
        answer: 'Para comparar modelos Ford com concorrentes, apoiar treinamentos, preparar argumentos comerciais e consultar diferenças técnicas com rapidez.',
      },
      {
        question: 'Quais dados entram na comparação?',
        answer: 'Modelo, ano, potência, torque, categoria e informações técnicas resumidas. A base pode ser expandida conforme a necessidade interna.',
      },
      {
        question: 'Os dados dos carros são oficiais?',
        answer: 'Nesta fase MVP, a base é demonstrativa. Para uso corporativo real, os dados devem ser validados por fontes oficiais e atualizados com governança.',
      },
      {
        question: 'Isso substitui material técnico oficial?',
        answer: 'Não. O Rivalis funciona como camada visual de apoio e consulta rápida, complementando materiais oficiais, treinamentos e políticas internas.',
      },
      {
        question: 'Funciona no celular e no desktop?',
        answer: 'Sim. A experiência foi pensada para uso responsivo, tanto em reuniões e treinamentos quanto em consulta rápida no dia a dia.',
      },
    ],
    [],
  );

  const openSearch = () => {
    bottomSheetRef.current?.present();
  };

  const handleBattle = (newReference: ReferenceVehicle) => {
    setReference(newReference);
    setResults(compareAgainstCompetitorCars(newReference));
    setTimeout(() => scrollToSection('resultado'), 240);
  };

  const registerSection = (key: SectionKey) => (event: LayoutChangeEvent) => {
    sectionY.current[key] = event.nativeEvent.layout.y;
  };

  const scrollToSection = (key: SectionKey) => {
    const y = key === 'topo' ? 0 : sectionY.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 84), animated: true });
  };

  const openSocial = (url: string) => {
    Linking.openURL(url).catch(() => undefined);
  };

  const renderSectionHeader = (kicker: string, title: string, description?: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionKicker}>{kicker}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {description ? <Text style={styles.sectionDescription}>{description}</Text> : null}
    </View>
  );

  return (
    <View style={styles.root}>
      <LinearGradient colors={gradients.appBackground} style={styles.background}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.navbar}>
            <Pressable onPress={() => scrollToSection('topo')} style={styles.brandArea}>
              <View style={styles.logoMark}>
                <Radar size={20} color={colors.accent} strokeWidth={2.7} />
              </View>
              <View>
                <Text style={styles.brandName}>RIVALIS</Text>
                <Text style={styles.brandCaption}>Internal Vehicle Intelligence</Text>
              </View>
            </Pressable>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navLinks}>
              {navLinks.map((item) => (
                <Pressable key={item.key} onPress={() => scrollToSection(item.key)} style={({ pressed }) => [styles.navLink, pressed && styles.navLinkPressed]}>
                  <Text style={styles.navLinkText}>{item.label}</Text>
                </Pressable>
              ))}
              <Pressable onPress={openSearch} style={({ pressed }) => [styles.navCta, pressed && styles.navLinkPressed]}>
                <Text style={styles.navCtaText}>Abrir comparador</Text>
              </Pressable>
            </ScrollView>
          </View>

          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            <View onLayout={registerSection('topo')} style={styles.heroSection}>
              <MotiView
                from={{ opacity: 0, translateY: 26 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 620 }}
                style={styles.heroCopy}
              >
                <View style={styles.heroBadge}>
                  <Sparkles size={16} color={colors.accent} strokeWidth={2.5} />
                  <Text style={styles.heroBadgeText}>Ferramenta B2E para análise competitiva automotiva</Text>
                </View>

                <Text style={styles.heroTitle}>Compare modelos Ford contra concorrentes com clareza de trabalho.</Text>
                <Text style={styles.heroSubtitle}>
                  O Rivalis foi reposicionado como uma ferramenta interna para colaboradores consultarem potência, torque e leitura competitiva no dia a dia. Menos busca manual, mais argumento técnico para reuniões, treinamentos e atendimento.
                </Text>

                <View style={styles.heroActions}>
                  <AnimatedButton label="Abrir Comparador Interno" onPress={openSearch} />
                  <Pressable onPress={() => scrollToSection('funciona')} style={({ pressed }) => [styles.secondaryCta, pressed && styles.secondaryCtaPressed]}>
                    <Play size={17} color={colors.accent} fill={colors.accent} />
                    <Text style={styles.secondaryCtaText}>Ver fluxo de uso</Text>
                  </Pressable>
                </View>

                <Text style={styles.microcopy}>Criado para apoiar colaboradores: benchmarking, treinamento, argumentação e consulta rápida.</Text>

                <View style={styles.statsGrid}>
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <LinearGradient key={stat.label} colors={gradients.card} style={styles.statCard}>
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
                style={styles.heroVisualWrapper}
              >
                <LinearGradient colors={gradients.premiumPanel} style={styles.heroVisual}>
                  <View style={styles.visualHeader}>
                    <View>
                      <Text style={styles.visualKicker}>Internal benchmark</Text>
                      <Text style={styles.visualTitle}>Ford vs Concorrentes</Text>
                    </View>
                    <View style={styles.livePill}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveText}>B2E MVP</Text>
                    </View>
                  </View>

                  <View style={styles.carBattleRow}>
                    <View style={styles.carNode}>
                      <Car size={34} color={colors.textPrimary} strokeWidth={2.2} />
                      <Text style={styles.carNodeTitle}>{reference.name}</Text>
                      <Text style={styles.carNodeMeta}>{reference.powerHp} hp • {reference.torqueNm} Nm</Text>
                    </View>
                    <View style={styles.versusBadge}>
                      <Text style={styles.versusText}>VS</Text>
                    </View>
                    <View style={styles.carNodeActive}>
                      <Car size={34} color={colors.accent} strokeWidth={2.2} />
                      <Text style={styles.carNodeTitle}>Concorrentes</Text>
                      <Text style={styles.carNodeMeta}>Benchmark data</Text>
                    </View>
                  </View>

                  <View style={styles.visualBars}>
                    <MetricPreview label="Potência" value={`${reference.powerHp} hp`} percent="76%" />
                    <MetricPreview label="Torque" value={`${reference.torqueNm} Nm`} percent="84%" />
                    <MetricPreview label="Uso interno" value="Consulta rápida" percent="92%" />
                  </View>

                  <View style={styles.visualFooter}>
                    <Text style={styles.visualFooterText}>Comparação técnica para apoiar decisões internas.</Text>
                    <ChevronRight size={18} color={colors.accent} />
                  </View>
                </LinearGradient>
              </MotiView>
            </View>

            <View onLayout={registerSection('sobre')} style={styles.sectionBlock}>
              {renderSectionHeader(
                'Uso interno',
                'Uma camada visual para análise competitiva no dia a dia.',
                'O Rivalis deixa de ser uma landing voltada ao comprador final e passa a ser uma solução B2E para colaboradores que precisam comparar modelos Ford com concorrentes de forma rápida, visual e consistente.',
              )}
              <LinearGradient colors={gradients.card} style={styles.aboutCard}>
                <Text style={styles.aboutText}>
                  A proposta é apoiar consultores, times de produto, treinamento, marketing e operações com uma leitura clara de potência, torque e posicionamento técnico. O foco não é vender um carro ao consumidor final, mas dar mais contexto para quem trabalha com a marca.
                </Text>
                <Text style={styles.aboutText}>
                  Em vez de depender de planilhas, fichas espalhadas e pesquisas manuais, o colaborador abre o comparador, informa o modelo de referência e visualiza os concorrentes em cards prontos para interpretação.
                </Text>
              </LinearGradient>
            </View>

            <View style={styles.sectionBlock}>
              {renderSectionHeader('Problema', 'Comparação competitiva interna não deveria depender de improviso.')}
              <View style={styles.problemGrid}>
                {painPoints.map((point, index) => (
                  <MotiView
                    key={point}
                    from={{ opacity: 0, translateY: 18 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 520, delay: index * 90 }}
                    style={styles.problemItem}
                  >
                    <View style={styles.problemNumber}>
                      <Text style={styles.problemNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.problemText}>{point}</Text>
                  </MotiView>
                ))}
              </View>
              <LinearGradient colors={gradients.premiumPanel} style={styles.questionCard}>
                <Text style={styles.questionLabel}>A pergunta interna</Text>
                <Text style={styles.questionText}>Como explicar, com clareza, onde um modelo Ford se posiciona frente ao concorrente direto?</Text>
                <Text style={styles.questionDescription}>O Rivalis ajuda a transformar comparação técnica em leitura prática para o trabalho.</Text>
              </LinearGradient>
            </View>

            <View onLayout={registerSection('funciona')} style={styles.sectionBlock}>
              {renderSectionHeader('Fluxo de uso', 'Da ficha técnica ao argumento em três passos.')}
              <View style={styles.stepsGrid}>
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <MotiView
                      key={step.title}
                      from={{ opacity: 0, translateY: 22 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ type: 'timing', duration: 520, delay: index * 110 }}
                      style={styles.stepCard}
                    >
                      <View style={styles.stepIconBox}>
                        <Icon size={24} color={colors.accent} strokeWidth={2.5} />
                      </View>
                      <Text style={styles.stepLabel}>{step.label}</Text>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                      <Text style={styles.stepDescription}>{step.description}</Text>
                    </MotiView>
                  );
                })}
              </View>
            </View>

            <View onLayout={registerSection('detalhes')} style={styles.sectionBlock}>
              {renderSectionHeader(
                'Análises',
                'Dados automotivos transformados em apoio operacional.',
                'Benefícios pensados para colaboradores que precisam comparar veículos de forma rápida, confiável e padronizada.',
              )}
              <View style={styles.benefitsGrid}>
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <MotiView
                      key={benefit.title}
                      from={{ opacity: 0, translateY: 18 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ type: 'timing', duration: 480, delay: index * 70 }}
                      style={styles.benefitCard}
                    >
                      <View style={styles.benefitIconBox}>
                        <Icon size={22} color={colors.accent} strokeWidth={2.5} />
                      </View>
                      <Text style={styles.benefitTitle}>{benefit.title}</Text>
                      <Text style={styles.benefitDescription}>{benefit.description}</Text>
                    </MotiView>
                  );
                })}
              </View>
            </View>

            <View style={styles.sectionBlock}>
              {renderSectionHeader('Visual do MVP', 'Um cockpit de benchmarking para equipes Ford.')}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.showcaseScroller}>
                {showcase.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <MotiView
                      key={item.title}
                      from={{ opacity: 0, translateX: 22 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      transition={{ type: 'timing', duration: 520, delay: index * 100 }}
                      style={styles.showcaseCard}
                    >
                      <View style={styles.showcaseTopLine} />
                      <Icon size={30} color={colors.accent} strokeWidth={2.4} />
                      <Text style={styles.showcaseTitle}>{item.title}</Text>
                      <Text style={styles.showcaseDescription}>{item.description}</Text>
                    </MotiView>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.sectionBlock}>
              <LinearGradient colors={gradients.premiumPanel} style={styles.urgencyCard}>
                <View style={styles.urgencyIconBox}>
                  <Users size={26} color={colors.accent} strokeWidth={2.5} />
                </View>
                <Text style={styles.urgencyKicker}>Piloto interno</Text>
                <Text style={styles.urgencyTitle}>Valide o Rivalis com equipes que lidam com concorrência todos os dias.</Text>
                <Text style={styles.urgencyDescription}>
                  O MVP pode ser apresentado como uma ferramenta de apoio para times comerciais, produto, treinamento e operações. A primeira etapa deve validar fluxo, base de dados, clareza dos cards e utilidade no trabalho real.
                </Text>
                <View style={styles.urgencyPills}>
                  {['Piloto B2E', 'Benchmarking', 'Treinamento', 'Argumentação', 'Base validável'].map((item) => (
                    <View key={item} style={styles.urgencyPill}>
                      <Text style={styles.urgencyPillText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <Pressable onPress={() => navigation.navigate('Obrigado')} style={({ pressed }) => [styles.blueButton, pressed && styles.secondaryCtaPressed]}>
                  <Mail size={18} color={colors.textPrimary} />
                  <Text style={styles.blueButtonText}>Solicitar piloto interno</Text>
                </Pressable>
              </LinearGradient>
            </View>

            <View style={styles.sectionBlock}>
              {renderSectionHeader('Cenários de uso', 'Como equipes poderiam usar o Rivalis no dia a dia.')}
              <View style={styles.testimonialsGrid}>
                {testimonials.map((testimonial) => (
                  <View key={testimonial.name} style={styles.testimonialCard}>
                    <Text style={styles.testimonialQuote}>“{testimonial.quote}”</Text>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View onLayout={registerSection('resultado')} style={styles.sectionBlock}>
              {renderSectionHeader(
                'Comparador interno',
                hasResults ? `Análise competitiva: ${reference.name}` : 'Comece uma comparação de referência.',
                hasResults
                  ? 'Veja concorrentes ordenados com diferenças percentuais de potência e torque para apoiar leitura interna.'
                  : 'Abra o painel, informe um modelo Ford de referência e deixe o Rivalis montar a comparação contra concorrentes.',
              )}
              {hasResults ? (
                <View style={styles.resultsList}>
                  {results.map((item, index) => (
                    <BattleCard key={`${item.brand}-${item.model}`} car={item} reference={reference} index={index} />
                  ))}
                </View>
              ) : (
                <LinearGradient colors={gradients.card} style={styles.emptyBattleCard}>
                  <Gauge size={34} color={colors.accent} strokeWidth={2.4} />
                  <Text style={styles.emptyBattleTitle}>Nenhuma análise iniciada ainda.</Text>
                  <Text style={styles.emptyBattleDescription}>Digite os dados do modelo de referência para visualizar concorrentes, barras comparativas e diferenças técnicas.</Text>
                  <AnimatedButton label="Abrir comparador" onPress={openSearch} pulse={false} />
                </LinearGradient>
              )}
            </View>

            <View onLayout={registerSection('faq')} style={styles.sectionBlock}>
              {renderSectionHeader('FAQ', 'Dúvidas rápidas para apresentar o MVP internamente.')}
              <View style={styles.faqList}>
                {faqs.map((faq) => (
                  <View key={faq.question} style={styles.faqItem}>
                    <Text style={styles.faqQuestion}>{faq.question}</Text>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View onLayout={registerSection('comparar')} style={styles.sectionBlock}>
              <LinearGradient colors={gradients.premiumPanel} style={styles.finalCtaCard}>
                <Text style={styles.finalKicker}>Pronto para apresentar</Text>
                <Text style={styles.finalTitle}>Transforme comparação técnica em argumento de trabalho.</Text>
                <Text style={styles.finalDescription}>
                  O Rivalis ajuda colaboradores a entenderem rapidamente como um modelo Ford se posiciona contra concorrentes diretos, com uma experiência visual, padronizada e pronta para uso em treinamentos, reuniões e atendimento.
                </Text>
                <AnimatedButton label="Comparar modelo Ford agora" onPress={openSearch} />
                <Text style={styles.finalMicrocopy}>Base demonstrativa para MVP. Para uso real, valide dados técnicos e regras internas antes da implantação.</Text>
              </LinearGradient>
            </View>

            <LinearGradient colors={gradients.premiumPanel} style={styles.footerShell}>
              <View style={styles.footerTop}>
                <View style={styles.footerBrandBlock}>
                  <View style={styles.footerLogoRow}>
                    <View style={styles.footerLogoMark}>
                      <Radar size={22} color={colors.accent} strokeWidth={2.7} />
                    </View>
                    <View>
                      <Text style={styles.footerBrand}>RIVALIS</Text>
                      <Text style={styles.footerSubBrand}>Internal Vehicle Intelligence</Text>
                    </View>
                  </View>
                  <Text style={styles.footerText}>
                    Ferramenta conceitual para comparação interna de modelos Ford contra concorrentes, com foco em benchmarking, treinamento e argumentação técnica.
                  </Text>
                  <View style={styles.footerBadges}>
                    {['B2E', 'MVP', 'Benchmark', 'Uso interno'].map((badge) => (
                      <View key={badge} style={styles.footerBadge}>
                        <Text style={styles.footerBadgeText}>{badge}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.footerGrid}>
                  <View style={styles.footerColumn}>
                    <Text style={styles.footerColumnTitle}>Produto</Text>
                    <Pressable onPress={() => scrollToSection('sobre')}><Text style={styles.footerLink}>Uso interno</Text></Pressable>
                    <Pressable onPress={() => scrollToSection('funciona')}><Text style={styles.footerLink}>Fluxo de trabalho</Text></Pressable>
                    <Pressable onPress={() => scrollToSection('detalhes')}><Text style={styles.footerLink}>Análises</Text></Pressable>
                    <Pressable onPress={openSearch}><Text style={styles.footerLink}>Abrir comparador</Text></Pressable>
                  </View>

                  <View style={styles.footerColumn}>
                    <Text style={styles.footerColumnTitle}>Aplicações</Text>
                    <Text style={styles.footerMutedLink}>Treinamento de produto</Text>
                    <Text style={styles.footerMutedLink}>Benchmarking competitivo</Text>
                    <Text style={styles.footerMutedLink}>Apoio comercial</Text>
                    <Text style={styles.footerMutedLink}>Consulta técnica rápida</Text>
                  </View>

                  <View style={styles.footerColumn}>
                    <Text style={styles.footerColumnTitle}>Links</Text>
                    <Pressable onPress={() => openSocial('https://instagram.com/rivalis.app')}><Text style={styles.footerLink}>Instagram</Text></Pressable>
                    <Pressable onPress={() => openSocial('https://youtube.com/@rivalisapp')}><Text style={styles.footerLink}>YouTube</Text></Pressable>
                    <Pressable onPress={() => openSocial('https://linkedin.com/company/rivalis')}><Text style={styles.footerLink}>LinkedIn</Text></Pressable>
                    <Pressable onPress={() => navigation.navigate('Esgotado')}><Text style={styles.footerLink}>Lista de acesso</Text></Pressable>
                  </View>
                </View>
              </View>

              <View style={styles.footerDivider} />

              <View style={styles.footerBottom}>
                <Text style={styles.footerLegal}>Rivalis — Compare com dados. Trabalhe com mais contexto.</Text>
                <Text style={styles.footerDisclaimer}>
                  MVP demonstrativo. A estética azul é apenas uma direção visual automotiva. Não utiliza logotipo oficial, não comunica parceria formal e os dados técnicos devem ser validados antes de qualquer uso corporativo real.
                </Text>
              </View>
            </LinearGradient>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      <VehicleSearchSheet bottomSheetRef={bottomSheetRef} onSubmit={handleBattle} />
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
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    minHeight: 74,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(7,17,31,0.88)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  brandArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minWidth: 194,
  },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.36)',
  },
  brandName: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 16,
    letterSpacing: 2.8,
  },
  brandCaption: {
    marginTop: 2,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 10,
    letterSpacing: 0.4,
  },
  navLinks: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    paddingLeft: spacing.md,
  },
  navLink: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLinkPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  navLinkText: {
    fontFamily: fonts.bodySemiBold,
    color: colors.textSecondary,
    fontSize: 12,
  },
  navCta: {
    minHeight: 38,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    ...shadows.cyanGlow,
  },
  navCtaText: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  content: {
    paddingTop: 96,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.huge,
  },
  heroSection: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing.xxl,
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
    flexWrap: 'wrap',
  },
  heroCopy: {
    flex: 1,
    minWidth: 310,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.32)',
    marginBottom: spacing.xl,
  },
  heroBadgeText: {
    fontFamily: fonts.bodyBold,
    color: colors.silver,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 48,
    lineHeight: 54,
    letterSpacing: -1.8,
  },
  heroSubtitle: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 680,
  },
  heroActions: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  secondaryCta: {
    minHeight: 56,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  secondaryCtaPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  secondaryCtaText: {
    fontFamily: fonts.bodyBold,
    color: colors.silver,
    fontSize: 14,
  },
  microcopy: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 13,
  },
  statsGrid: {
    marginTop: spacing.xxl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    flexGrow: 1,
    minWidth: 150,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    marginTop: spacing.md,
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 22,
  },
  statLabel: {
    marginTop: 2,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12,
  },
  heroVisualWrapper: {
    flex: 0.92,
    minWidth: 310,
    borderRadius: radius.xl,
    ...shadows.card,
  },
  heroVisual: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  visualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  visualKicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  visualTitle: {
    marginTop: 4,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 24,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.accentSoft,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  liveText: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 1,
  },
  carBattleRow: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  carNode: {
    flex: 1,
    minHeight: 140,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  carNodeActive: {
    flex: 1,
    minHeight: 140,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.36)',
    justifyContent: 'center',
  },
  carNodeTitle: {
    marginTop: spacing.md,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 18,
  },
  carNodeMeta: {
    marginTop: 4,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12,
  },
  versusBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    ...shadows.cyanGlow,
  },
  versusText: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 14,
  },
  visualBars: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  metricPreview: {
    gap: spacing.sm,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  metricLabel: {
    fontFamily: fonts.bodySemiBold,
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontFamily: fonts.bodyBold,
    color: colors.silver,
    fontSize: 12,
  },
  metricTrack: {
    height: 10,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  metricFill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },
  visualFooter: {
    marginTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  visualFooterText: {
    fontFamily: fonts.bodySemiBold,
    color: colors.silver,
    fontSize: 13,
  },
  sectionBlock: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    paddingVertical: spacing.huge,
  },
  sectionHeader: {
    marginBottom: spacing.xl,
    maxWidth: 760,
  },
  sectionKicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -1.2,
  },
  sectionDescription: {
    marginTop: spacing.md,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },
  aboutCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.lg,
    ...shadows.card,
  },
  aboutText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 26,
  },
  problemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  problemItem: {
    flex: 1,
    minWidth: 250,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    padding: spacing.lg,
  },
  problemNumber: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    marginBottom: spacing.md,
  },
  problemNumberText: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 13,
  },
  problemText: {
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  questionCard: {
    marginTop: spacing.lg,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  questionText: {
    marginTop: spacing.md,
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 28,
    lineHeight: 34,
  },
  questionDescription: {
    marginTop: spacing.md,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  stepCard: {
    flex: 1,
    minWidth: 260,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    ...shadows.card,
  },
  stepIconBox: {
    width: 54,
    height: 54,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.32)',
    marginBottom: spacing.lg,
  },
  stepLabel: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
  },
  stepTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 21,
  },
  stepDescription: {
    marginTop: spacing.md,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  benefitCard: {
    flex: 1,
    minWidth: 250,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    padding: spacing.lg,
  },
  benefitIconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    marginBottom: spacing.lg,
  },
  benefitTitle: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 18,
  },
  benefitDescription: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  showcaseScroller: {
    gap: spacing.lg,
    paddingRight: spacing.xl,
  },
  showcaseCard: {
    width: 280,
    minHeight: 230,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  showcaseTopLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: colors.accent,
  },
  showcaseTitle: {
    marginTop: spacing.xl,
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 20,
  },
  showcaseDescription: {
    marginTop: spacing.md,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  urgencyCard: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
    ...shadows.card,
  },
  urgencyIconBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.32)',
    marginBottom: spacing.lg,
  },
  urgencyKicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  urgencyTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -1.1,
  },
  urgencyDescription: {
    marginTop: spacing.md,
    maxWidth: 760,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },
  urgencyPills: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  urgencyPill: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
  },
  urgencyPillText: {
    fontFamily: fonts.bodySemiBold,
    color: colors.silver,
    fontSize: 12,
  },
  blueButton: {
    marginTop: spacing.xl,
    minHeight: 56,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    ...shadows.primaryGlow,
  },
  blueButtonText: {
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  testimonialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  testimonialCard: {
    flex: 1,
    minWidth: 250,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    padding: spacing.lg,
  },
  testimonialQuote: {
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  testimonialName: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 14,
  },
  testimonialRole: {
    marginTop: 3,
    fontFamily: fonts.bodyMedium,
    color: colors.accent,
    fontSize: 12,
  },
  resultsList: {
    gap: spacing.sm,
  },
  emptyBattleCard: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  emptyBattleTitle: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 24,
  },
  emptyBattleDescription: {
    maxWidth: 620,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  faqList: {
    gap: spacing.md,
  },
  faqItem: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
  },
  faqQuestion: {
    fontFamily: fonts.heading,
    color: colors.textPrimary,
    fontSize: 17,
  },
  faqAnswer: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  finalCtaCard: {
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
    ...shadows.card,
  },
  finalKicker: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  finalTitle: {
    marginTop: spacing.sm,
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 44,
    letterSpacing: -1.1,
  },
  finalDescription: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    maxWidth: 760,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },
  finalMicrocopy: {
    marginTop: spacing.lg,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 13,
  },
  footerShell: {
    width: '100%',
    maxWidth: 1180,
    alignSelf: 'center',
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.huge,
    ...shadows.card,
  },
  footerTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xxl,
    justifyContent: 'space-between',
  },
  footerBrandBlock: {
    flex: 1.2,
    minWidth: 280,
  },
  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  footerLogoMark: {
    width: 48,
    height: 48,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.36)',
  },
  footerBrand: {
    fontFamily: fonts.headingBold,
    color: colors.textPrimary,
    fontSize: 22,
    letterSpacing: 3.2,
  },
  footerSubBrand: {
    marginTop: 2,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 11,
    letterSpacing: 0.4,
  },
  footerText: {
    marginTop: spacing.lg,
    maxWidth: 460,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  footerBadges: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  footerBadge: {
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(0,174,239,0.24)',
  },
  footerBadgeText: {
    fontFamily: fonts.bodyBold,
    color: colors.accent,
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  footerGrid: {
    flex: 1.1,
    minWidth: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
    justifyContent: 'space-between',
  },
  footerColumn: {
    minWidth: 140,
    gap: spacing.sm,
  },
  footerColumnTitle: {
    marginBottom: spacing.sm,
    fontFamily: fonts.bodyBold,
    color: colors.textPrimary,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footerLink: {
    fontFamily: fonts.bodySemiBold,
    color: colors.accent,
    fontSize: 13,
  },
  footerMutedLink: {
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xl,
  },
  footerBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    justifyContent: 'space-between',
  },
  footerLegal: {
    flex: 1,
    minWidth: 260,
    fontFamily: fonts.bodyBold,
    color: colors.silver,
    fontSize: 13,
  },
  footerDisclaimer: {
    flex: 1.4,
    minWidth: 300,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
});

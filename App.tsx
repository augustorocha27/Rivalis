import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  useFonts as useMontserratFonts,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { HomeScreen } from './src/screens/HomeScreen';
import { InternalUseScreen } from './src/screens/InternalUseScreen';
import { WorkflowScreen } from './src/screens/WorkflowScreen';
import { AnalysesScreen } from './src/screens/AnalysesScreen';
import { FaqScreen } from './src/screens/FaqScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { ThankYouScreen } from './src/screens/ThankYouScreen';
import { SoldOutScreen } from './src/screens/SoldOutScreen';
import { colors } from './src/theme';
import type { RootStackParamList } from './src/@types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const rivalisNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accent,
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:8081', 'https://rivalis.app'],
  config: {
    screens: {
      Home: '',
      UsoInterno: 'uso-interno',
      Fluxo: 'fluxo',
      Analises: 'analises',
      FAQ: 'faq',
      Resultados: 'resultados',
      Obrigado: 'obrigado',
      Esgotado: 'esgotado',
    },
  },
};

export default function App() {
  const [montserratLoaded] = useMontserratFonts({
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const fontsLoaded = montserratLoaded && interLoaded;

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        <NavigationContainer theme={rivalisNavigationTheme} linking={linking}>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
              animation: 'fade_from_bottom',
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="UsoInterno" component={InternalUseScreen} />
            <Stack.Screen name="Fluxo" component={WorkflowScreen} />
            <Stack.Screen name="Analises" component={AnalysesScreen} />
            <Stack.Screen name="FAQ" component={FaqScreen} />
            <Stack.Screen name="Resultados" component={ResultsScreen} />
            <Stack.Screen name="Obrigado" component={ThankYouScreen} />
            <Stack.Screen name="Esgotado" component={SoldOutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

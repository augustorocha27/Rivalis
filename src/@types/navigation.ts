import type { ReferenceVehicle } from './car';

export type RootStackParamList = {
  Home: undefined;
  UsoInterno: undefined;
  Fluxo: undefined;
  Analises: undefined;
  FAQ: undefined;
  Resultados: { reference: ReferenceVehicle };
  Obrigado: undefined;
  Esgotado: undefined;
};

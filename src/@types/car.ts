export type VehicleBodyType = 'Sedan' | 'Hatch' | 'SUV' | 'Picape' | 'Esportivo' | 'Utilitário';

export type PremiumCar = {
  id: string;
  brand: string;
  model: string;
  year: number;
  powerHp: number;
  torqueNm: number;
  zeroToHundred: number;
  drivetrain: 'AWD' | 'RWD' | 'FWD' | '4X4';
  engine: string;
  category: string;
  bodyType: VehicleBodyType;
  highlight: string;
};

export type ReferenceVehicle = {
  name: string;
  year: number;
  bodyType: VehicleBodyType;
  powerHp: number;
  torqueNm: number;
  sourceLabel?: string;
};

export type BattleResult = PremiumCar & {
  powerDiffPercent: number;
  torqueDiffPercent: number;
  overallDiffPercent: number;
  rivalWinsPower: boolean;
  rivalWinsTorque: boolean;
  rivalWinsBattle: boolean;
};

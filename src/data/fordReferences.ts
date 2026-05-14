import type { ReferenceVehicle, VehicleBodyType } from '../@types/car';

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

type FordReferencePreset = {
  match: string[];
  bodyType: VehicleBodyType;
  powerHp: number;
  torqueNm: number;
  label: string;
};

const presets: FordReferencePreset[] = [
  {
    match: ['ranger'],
    bodyType: 'Picape',
    powerHp: 250,
    torqueNm: 600,
    label: 'Preset demonstrativo: Ranger 3.0 V6',
  },
  {
    match: ['maverick'],
    bodyType: 'Picape',
    powerHp: 253,
    torqueNm: 380,
    label: 'Preset demonstrativo: Maverick Lariat FX4',
  },
  {
    match: ['territory'],
    bodyType: 'SUV',
    powerHp: 169,
    torqueNm: 250,
    label: 'Preset demonstrativo: Territory',
  },
  {
    match: ['bronco'],
    bodyType: 'SUV',
    powerHp: 253,
    torqueNm: 380,
    label: 'Preset demonstrativo: Bronco Sport',
  },
  {
    match: ['mustang'],
    bodyType: 'Esportivo',
    powerHp: 486,
    torqueNm: 567,
    label: 'Preset demonstrativo: Mustang GT',
  },
  {
    match: ['focus'],
    bodyType: 'Hatch',
    powerHp: 178,
    torqueNm: 240,
    label: 'Preset demonstrativo: Focus Titanium/EcoBoost',
  },
  {
    match: ['fiesta'],
    bodyType: 'Hatch',
    powerHp: 128,
    torqueNm: 160,
    label: 'Preset demonstrativo: Fiesta',
  },
  {
    match: ['fusion'],
    bodyType: 'Sedan',
    powerHp: 248,
    torqueNm: 380,
    label: 'Preset demonstrativo: Fusion EcoBoost',
  },
  {
    match: ['ka sedan', 'ka+'],
    bodyType: 'Sedan',
    powerHp: 136,
    torqueNm: 158,
    label: 'Preset demonstrativo: Ka Sedan',
  },
  {
    match: ['transit'],
    bodyType: 'Utilitário',
    powerHp: 170,
    torqueNm: 390,
    label: 'Preset demonstrativo: Transit',
  },
];

const fallbackByType: Record<VehicleBodyType, Omit<ReferenceVehicle, 'name' | 'year' | 'bodyType'>> = {
  Sedan: {
    powerHp: 160,
    torqueNm: 240,
    sourceLabel: 'Preset genérico demonstrativo para sedan Ford',
  },
  Hatch: {
    powerHp: 128,
    torqueNm: 170,
    sourceLabel: 'Preset genérico demonstrativo para hatch Ford',
  },
  SUV: {
    powerHp: 169,
    torqueNm: 250,
    sourceLabel: 'Preset genérico demonstrativo para SUV Ford',
  },
  Picape: {
    powerHp: 250,
    torqueNm: 600,
    sourceLabel: 'Preset genérico demonstrativo para picape Ford',
  },
  Esportivo: {
    powerHp: 486,
    torqueNm: 567,
    sourceLabel: 'Preset genérico demonstrativo para esportivo Ford',
  },
  Utilitário: {
    powerHp: 170,
    torqueNm: 390,
    sourceLabel: 'Preset genérico demonstrativo para utilitário Ford',
  },
};

export const vehicleBodyTypes: VehicleBodyType[] = ['Sedan', 'Hatch', 'SUV', 'Picape', 'Esportivo', 'Utilitário'];

export function buildFordReference(model: string, year: string, bodyType: VehicleBodyType): ReferenceVehicle {
  const normalizedModel = normalize(model);
  const parsedYear = Number(year.replace(/[^0-9]/g, '')) || new Date().getFullYear();
  const matchedPreset = presets.find((preset) =>
    preset.match.some((term) => normalizedModel.includes(normalize(term))),
  );

  if (matchedPreset) {
    return {
      name: model.trim(),
      year: parsedYear,
      bodyType,
      powerHp: matchedPreset.powerHp,
      torqueNm: matchedPreset.torqueNm,
      sourceLabel:
        matchedPreset.bodyType === bodyType
          ? matchedPreset.label
          : `${matchedPreset.label} ajustado ao filtro ${bodyType}`,
    };
  }

  const fallback = fallbackByType[bodyType];

  return {
    name: model.trim(),
    year: parsedYear,
    bodyType,
    powerHp: fallback.powerHp,
    torqueNm: fallback.torqueNm,
    sourceLabel: fallback.sourceLabel,
  };
}

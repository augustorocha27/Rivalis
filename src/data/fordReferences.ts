import type { ReferenceVehicle, VehicleBodyType } from '../@types/car';

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

type VehicleReferencePreset = {
  match: string[];
  bodyType: VehicleBodyType;
  powerHp: number;
  torqueNm: number;
  label: string;
};

const presets: VehicleReferencePreset[] = [
  {
    match: ['ranger'],
    bodyType: 'Picape',
    powerHp: 250,
    torqueNm: 600,
    label: 'Preset demonstrativo: Ford Ranger 3.0 V6',
  },
  {
    match: ['maverick'],
    bodyType: 'Picape',
    powerHp: 253,
    torqueNm: 380,
    label: 'Preset demonstrativo: Ford Maverick Lariat FX4',
  },
  {
    match: ['territory'],
    bodyType: 'SUV',
    powerHp: 169,
    torqueNm: 250,
    label: 'Preset demonstrativo: Ford Territory',
  },
  {
    match: ['bronco'],
    bodyType: 'SUV',
    powerHp: 253,
    torqueNm: 380,
    label: 'Preset demonstrativo: Ford Bronco Sport',
  },
  {
    match: ['mustang'],
    bodyType: 'Esportivo',
    powerHp: 486,
    torqueNm: 567,
    label: 'Preset demonstrativo: Ford Mustang GT',
  },
  {
    match: ['focus'],
    bodyType: 'Hatch',
    powerHp: 178,
    torqueNm: 240,
    label: 'Preset demonstrativo: Ford Focus Titanium/EcoBoost',
  },
  {
    match: ['fiesta'],
    bodyType: 'Hatch',
    powerHp: 128,
    torqueNm: 160,
    label: 'Preset demonstrativo: Ford Fiesta',
  },
  {
    match: ['fusion'],
    bodyType: 'Sedan',
    powerHp: 248,
    torqueNm: 380,
    label: 'Preset demonstrativo: Ford Fusion EcoBoost',
  },
  {
    match: ['ka sedan', 'ka+', 'ka'],
    bodyType: 'Sedan',
    powerHp: 136,
    torqueNm: 158,
    label: 'Preset demonstrativo: Ford Ka Sedan',
  },
  {
    match: ['transit'],
    bodyType: 'Utilitário',
    powerHp: 170,
    torqueNm: 390,
    label: 'Preset demonstrativo: Ford Transit',
  },
  {
    match: ['hilux'],
    bodyType: 'Picape',
    powerHp: 204,
    torqueNm: 500,
    label: 'Preset demonstrativo: Toyota Hilux',
  },
  {
    match: ['s10'],
    bodyType: 'Picape',
    powerHp: 207,
    torqueNm: 510,
    label: 'Preset demonstrativo: Chevrolet S10',
  },
  {
    match: ['amarok'],
    bodyType: 'Picape',
    powerHp: 258,
    torqueNm: 580,
    label: 'Preset demonstrativo: Volkswagen Amarok',
  },
  {
    match: ['corolla'],
    bodyType: 'Sedan',
    powerHp: 175,
    torqueNm: 210,
    label: 'Preset demonstrativo: Toyota Corolla',
  },
  {
    match: ['civic'],
    bodyType: 'Sedan',
    powerHp: 184,
    torqueNm: 240,
    label: 'Preset demonstrativo: Honda Civic',
  },
  {
    match: ['tracker'],
    bodyType: 'SUV',
    powerHp: 133,
    torqueNm: 210,
    label: 'Preset demonstrativo: Chevrolet Tracker',
  },
  {
    match: ['compass', 'commander'],
    bodyType: 'SUV',
    powerHp: 185,
    torqueNm: 270,
    label: 'Preset demonstrativo: SUV concorrente',
  },
  {
    match: ['polo', 'onix', 'hb20'],
    bodyType: 'Hatch',
    powerHp: 116,
    torqueNm: 165,
    label: 'Preset demonstrativo: hatch compacto concorrente',
  },
];

const fallbackByType: Record<VehicleBodyType, Omit<ReferenceVehicle, 'brand' | 'name' | 'year' | 'bodyType'>> = {
  Sedan: {
    powerHp: 160,
    torqueNm: 240,
    sourceLabel: 'Preset genérico demonstrativo para sedan',
  },
  Hatch: {
    powerHp: 128,
    torqueNm: 170,
    sourceLabel: 'Preset genérico demonstrativo para hatch',
  },
  SUV: {
    powerHp: 169,
    torqueNm: 250,
    sourceLabel: 'Preset genérico demonstrativo para SUV',
  },
  Picape: {
    powerHp: 250,
    torqueNm: 600,
    sourceLabel: 'Preset genérico demonstrativo para picape',
  },
  Esportivo: {
    powerHp: 486,
    torqueNm: 567,
    sourceLabel: 'Preset genérico demonstrativo para esportivo',
  },
  Utilitário: {
    powerHp: 170,
    torqueNm: 390,
    sourceLabel: 'Preset genérico demonstrativo para utilitário',
  },
};

export const vehicleBodyTypes: VehicleBodyType[] = ['Sedan', 'Hatch', 'SUV', 'Picape', 'Esportivo', 'Utilitário'];

function inferBodyType(model: string): VehicleBodyType {
  const normalizedModel = normalize(model);
  const matchedPreset = presets.find((preset) =>
    preset.match.some((term) => normalizedModel.includes(normalize(term))),
  );

  if (matchedPreset) {
    return matchedPreset.bodyType;
  }

  const keywordMap: Array<{ terms: string[]; bodyType: VehicleBodyType }> = [
    { terms: ['ranger', 'hilux', 's10', 'amarok', 'frontier', 'l200', 'maverick', 'picape', 'pickup'], bodyType: 'Picape' },
    { terms: ['territory', 'bronco', 'tracker', 'compass', 'commander', 'creta', 'hr-v', 'corolla cross', 'suv'], bodyType: 'SUV' },
    { terms: ['fusion', 'corolla', 'civic', 'sentra', 'virtus', 'versa', 'sedan'], bodyType: 'Sedan' },
    { terms: ['focus', 'fiesta', 'polo', 'onix', 'hb20', 'hatch'], bodyType: 'Hatch' },
    { terms: ['mustang', 'camaro', 'porsche', 'esportivo'], bodyType: 'Esportivo' },
    { terms: ['transit', 'van', 'utilitario', 'utilitário'], bodyType: 'Utilitário' },
  ];

  const matchedKeyword = keywordMap.find((item) =>
    item.terms.some((term) => normalizedModel.includes(normalize(term))),
  );

  return matchedKeyword?.bodyType ?? 'SUV';
}

export function buildVehicleReference(brand: string, model: string, year: string): ReferenceVehicle {
  const normalizedModel = normalize(model);
  const parsedYear = Number(year.replace(/[^0-9]/g, '')) || new Date().getFullYear();
  const matchedPreset = presets.find((preset) =>
    preset.match.some((term) => normalizedModel.includes(normalize(term))),
  );

  if (matchedPreset) {
    return {
      brand: brand.trim(),
      name: model.trim(),
      year: parsedYear,
      bodyType: matchedPreset.bodyType,
      powerHp: matchedPreset.powerHp,
      torqueNm: matchedPreset.torqueNm,
      sourceLabel: matchedPreset.label,
    };
  }

  const inferredBodyType = inferBodyType(model);
  const fallback = fallbackByType[inferredBodyType];

  return {
    brand: brand.trim(),
    name: model.trim(),
    year: parsedYear,
    bodyType: inferredBodyType,
    powerHp: fallback.powerHp,
    torqueNm: fallback.torqueNm,
    sourceLabel: `${fallback.sourceLabel} inferido por marca/modelo/ano`,
  };
}

// Mantém compatibilidade com versões anteriores do projeto.
export function buildFordReference(model: string, year: string, bodyType?: VehicleBodyType): ReferenceVehicle {
  const reference = buildVehicleReference('Ford', model, year);

  if (!bodyType || bodyType === reference.bodyType) {
    return reference;
  }

  const fallback = fallbackByType[bodyType];

  return {
    ...reference,
    bodyType,
    powerHp: fallback.powerHp,
    torqueNm: fallback.torqueNm,
    sourceLabel: `${reference.sourceLabel || 'Preset demonstrativo'} ajustado ao segmento ${bodyType}`,
  };
}
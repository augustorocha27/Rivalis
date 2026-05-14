import type { BattleResult, ReferenceVehicle } from '../@types/car';
import { competitorCars } from '../data/cars';

const calculateDiffPercent = (rivalValue: number, referenceValue: number) => {
  if (referenceValue <= 0) return 0;
  return Number((((rivalValue - referenceValue) / referenceValue) * 100).toFixed(1));
};

export const compareAgainstCompetitorCars = (reference: ReferenceVehicle): BattleResult[] => {
  return competitorCars
    .map((car) => {
      const powerDiffPercent = calculateDiffPercent(car.powerHp, reference.powerHp);
      const torqueDiffPercent = calculateDiffPercent(car.torqueNm, reference.torqueNm);
      const overallDiffPercent = Number(((powerDiffPercent + torqueDiffPercent) / 2).toFixed(1));

      return {
        ...car,
        powerDiffPercent,
        torqueDiffPercent,
        overallDiffPercent,
        rivalWinsPower: powerDiffPercent >= 0,
        rivalWinsTorque: torqueDiffPercent >= 0,
        rivalWinsBattle: overallDiffPercent >= 0,
      };
    })
    .sort((a, b) => b.overallDiffPercent - a.overallDiffPercent);
};

// Mantém compatibilidade com versões anteriores do projeto.
export const compareAgainstPremiumCars = compareAgainstCompetitorCars;

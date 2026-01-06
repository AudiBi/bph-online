import type { InsuranceProduct } from '../services/insurance.types';

export const insuranceProducts: InsuranceProduct[] = [
  { type: 'Vie', base: 50 },
  { type: 'Prêt', base: 30 },
  { type: 'Auto/Habitation', base: 40 },
  { type: 'Voyage', base: 25 }
];

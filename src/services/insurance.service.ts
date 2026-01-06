import { insuranceProducts } from '@/mocks/insurance';
import type { InsuranceProduct } from './insurance.types';
import { logAudit } from './audit/audit.service';

export function getAllInsurance(): InsuranceProduct[] {
  return insuranceProducts;
}

// Calcul simple d’un devis aléatoire basé sur le prix de base
export function insuranceQuote(type: string): number | null {
  const product = insuranceProducts.find(p => p.type === type);
  if (!product) return null;

  const quote = product.base + Math.floor(Math.random() * 30);
  
  logAudit('INSURANCE_QUOTE', { type, quote });
  return quote;
}

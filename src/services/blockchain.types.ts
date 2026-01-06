export interface BlockchainRecord {
  hash: string;
  document: string;
  timestamp: string;
  status: 'Validé' | 'Révoqué' | 'En attente';
}

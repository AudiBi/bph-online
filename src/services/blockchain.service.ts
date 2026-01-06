import { blockchainLedger } from '@/mocks/blockchain';
import type { BlockchainRecord } from './blockchain.types';
import { logAudit } from './audit/audit.service';

export function verifyBlockchainHash(
  hash: string
): BlockchainRecord | null {
  const record = blockchainLedger.find(r => r.hash === hash);

  logAudit('BLOCKCHAIN_VERIFY', {
    hash,
    found: !!record
  });

  return record ?? null;
}

export function getBlockchainLedger(): BlockchainRecord[] {
  return blockchainLedger;
}

import { logAudit } from '../audit/audit.service';

export function signDocument(
  documentId: string,
  userId: string
): boolean {
  logAudit('SIGN_DOCUMENT', {
    documentId,
    userId,
    signedAt: new Date().toISOString()
  });
  return true;
}

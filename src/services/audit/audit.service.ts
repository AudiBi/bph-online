export function logAudit(event: string, payload: any) {
  console.log('[AUDIT]', {
    event,
    payload,
    timestamp: new Date().toISOString()
  });
}

import api from '@/services/api';

export function requestFinancing(payload: any) {
  return api.post('/business/financing', payload);
}

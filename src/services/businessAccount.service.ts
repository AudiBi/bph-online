import api from '@/services/api';

export async function openBusinessAccount(payload: FormData) {
  return api.post('/business/accounts', payload);
}

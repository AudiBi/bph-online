import api from '@/services/api';

export function requestPOS() {
  return api.post('/business/pos/request');
}

export function fetchTransactions() {
  return api.get('/business/pos/transactions');
}

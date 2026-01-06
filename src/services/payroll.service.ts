import api from '@/services/api';

export function uploadPayroll(file: File) {
  const data = new FormData();
  data.append('file', file);
  return api.post('/business/payroll', data);
}

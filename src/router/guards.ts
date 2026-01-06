import { SecureStorage } from '@/services/secureStorage';

export async function authGuard() {
  const token = await SecureStorage.getAccessToken();
  return !!token || '/';
}

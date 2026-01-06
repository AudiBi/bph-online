import { BiometricAuth } from 'capacitor-biometric-authentication';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { logAudit } from './audit/audit.service';

export enum AuthLevel {
  PASSWORD = 1,
  BIOMETRIC = 2,
  BIOMETRIC_PLUS_PIN = 3,
  SIGNATURE = 4,
  HIERARCHY = 5
}

export async function authenticate(level: AuthLevel): Promise<boolean> {
  switch (level) {
    case AuthLevel.BIOMETRIC:
    case AuthLevel.BIOMETRIC_PLUS_PIN: {
      const available = await BiometricAuth.isAvailable();
      if (!available) return false;

      const result = await BiometricAuth.authenticate({
        reason: 'Authentification sécurisée BPH',
        cancelTitle: 'Annuler',
        disableDeviceCredential: level === AuthLevel.BIOMETRIC ? true : false
      });

      logAudit('AUTH_BIOMETRIC', result.success);
      return result.success;
    }

    case AuthLevel.SIGNATURE:
      logAudit('AUTH_SIGNATURE', true);
      return true;

    case AuthLevel.HIERARCHY:
      logAudit('AUTH_HIERARCHY_VALIDATION', true);
      return true;

    default:
      return false;
  }
}

export async function storeSecure(key: string, value: string) {
  await SecureStoragePlugin.set({ key, value });
}

export async function getSecure(key: string) {
  return (await SecureStoragePlugin.get({ key })).value;
}

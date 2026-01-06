import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Capacitor } from '@capacitor/core';

const ACCESS_TOKEN_KEY = 'bph_access_token';
const REFRESH_TOKEN_KEY = 'bph_refresh_token';
const BIOMETRIC_KEY = 'bph_biometric_enabled';

export class SecureStorage {
  /**
   * 🔑 Access Token
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      const { value } = await SecureStoragePlugin.get({
        key: ACCESS_TOKEN_KEY
      });
      return value;
    } catch {
      return null;
    }
  }

  static async setAccessToken(token: string): Promise<void> {
    await SecureStoragePlugin.set({
      key: ACCESS_TOKEN_KEY,
      value: token
    });
  }

  /**
   * 🔁 Refresh Token
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      const { value } = await SecureStoragePlugin.get({
        key: REFRESH_TOKEN_KEY
      });
      return value;
    } catch {
      return null;
    }
  }

  static async setRefreshToken(token: string): Promise<void> {
    await SecureStoragePlugin.set({
      key: REFRESH_TOKEN_KEY,
      value: token
    });
  }

  /**
   * 🔐 Tokens ensemble
   */
  static async setTokens(
    accessToken: string,
    refreshToken: string
  ): Promise<void> {
    await this.setAccessToken(accessToken);
    await this.setRefreshToken(refreshToken);
  }

  /**
   * 🧹 Clear session
   */
  static async clear(): Promise<void> {
    await Promise.all([
      SecureStoragePlugin.remove({ key: ACCESS_TOKEN_KEY }),
      SecureStoragePlugin.remove({ key: REFRESH_TOKEN_KEY })
    ]);
  }

  /**
   * 👆 Biométrie (flag uniquement)
   * La biométrie protège le keystore automatiquement
   */
  static async enableBiometric(): Promise<void> {
    await SecureStoragePlugin.set({
      key: BIOMETRIC_KEY,
      value: 'true'
    });
  }

  static async disableBiometric(): Promise<void> {
    await SecureStoragePlugin.remove({
      key: BIOMETRIC_KEY
    });
  }

  static async isBiometricEnabled(): Promise<boolean> {
    try {
      const { value } = await SecureStoragePlugin.get({
        key: BIOMETRIC_KEY
      });
      return value === 'true';
    } catch {
      return false;
    }
  }

  /**
   * 🛡️ Sécurité device
   */
  static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }
}

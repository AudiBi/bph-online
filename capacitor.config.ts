import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bph.online',
  appName: 'BPH Online',
  webDir: 'dist',
  bundledWebRuntime: false,

  server: {
    androidScheme: 'https'
  },

  plugins: {
    BiometricAuth: {
      reason: 'Authentification sécurisée BPH',
      cancelTitle: 'Annuler',
      allowDeviceCredential: true
    }
  }
};

export default config;

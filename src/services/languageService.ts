import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { i18n } from '@/i18n';

const LANG_KEY = 'bph_language';

export async function setLanguage(lang: 'fr' | 'en' | 'ht') {
  i18n.global.locale.value = lang;
  await SecureStoragePlugin.set({
    key: LANG_KEY,
    value: lang
  });
}

export async function loadLanguage() {
  try {
    const { value } = await SecureStoragePlugin.get({ key: LANG_KEY });
    if (value === 'fr' || value === 'en' || value === 'ht') {
      i18n.global.locale.value = value;
    } else {
      i18n.global.locale.value = 'fr';
    }
  } catch {
    i18n.global.locale.value = 'fr';
  }
}


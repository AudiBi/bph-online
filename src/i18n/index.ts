import { createI18n } from 'vue-i18n';
import fr from './fr.json';
import en from './en.json';
import ht from './ht.json';

const DEFAULT_LOCALE = 'fr';

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'fr',
  messages: { fr, en, ht }
});

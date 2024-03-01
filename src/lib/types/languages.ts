import type { languages } from '@/i18n/settings';

export type LanguageKeysValues = (typeof languages)[number];
export interface LanguageKeys<T = string> {
  [key: LanguageKeysValues]: T;
}

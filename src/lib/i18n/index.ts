import en from './en';
import fa from './fa';

export const translations = { en, fa };
export type Language = keyof typeof translations;

// Deep get utility for nested keys like 'settings.gameSettings'
function deepGet(obj: any, path: string[]): string | undefined {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function t(lang: Language, key: string, fallbackLang: Language = 'en'): string {
  const path = key.split('.');
  let value = deepGet(translations[lang], path);
  if (typeof value === 'string') return value;
  // fallback to default language
  value = deepGet(translations[fallbackLang], path);
  return typeof value === 'string' ? value : key;
}

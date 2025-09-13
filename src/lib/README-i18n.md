# Internationalization (i18n) Guide

This project uses a centralized translation system that makes it easy to add new languages and manage all text content.

## How to Add a New Language

### 1. Update the Language Type
In `src/lib/translations.ts`, add your new language to the `Language` type:

```typescript
export type Language = 'en' | 'fa' | 'es' | 'fr'; // Add your language code
```

### 2. Add Translations
In the `translations` object, add a new entry for your language:

```typescript
export const translations: Record<Language, Translations> = {
  en: { /* existing English translations */ },
  fa: { /* existing Persian translations */ },
  es: { /* Spanish translations */ },
  fr: { /* French translations */ },
};
```

### 3. Update Language Toggle
In `src/components/Header.tsx`, update the language toggle logic:

```typescript
const toggleLanguage = () => {
  const languages: Language[] = ['en', 'fa', 'es', 'fr'];
  const currentIndex = languages.indexOf(state.language);
  const nextIndex = (currentIndex + 1) % languages.length;
  dispatch({
    type: 'SET_LANGUAGE',
    payload: languages[nextIndex],
  });
};
```

### 4. Update Language Display
Update the language toggle button to show the next language:

```typescript
const getNextLanguage = () => {
  const languages: Language[] = ['en', 'fa', 'es', 'fr'];
  const currentIndex = languages.indexOf(state.language);
  const nextIndex = (currentIndex + 1) % languages.length;
  return languages[nextIndex].toUpperCase();
};
```

## Translation Keys

All translatable strings are defined in the `Translations` interface. When adding new text to the app:

1. Add the key to the `Translations` interface
2. Add the translation for all supported languages
3. Use the translation in your component with `t.keyName`

## Example: Adding Spanish

```typescript
// 1. Update Language type
export type Language = 'en' | 'fa' | 'es';

// 2. Add Spanish translations
export const translations: Record<Language, Translations> = {
  en: {
    partyGames: 'Party Games',
    // ... other translations
  },
  fa: {
    partyGames: 'بازی‌های گروهی',
    // ... other translations
  },
  es: {
    partyGames: 'Juegos de Fiesta',
    developedBy: 'Desarrollado por R',
    next: 'Siguiente',
    // ... all other keys
  },
};
```

## Best Practices

1. **Keep keys descriptive**: Use clear, descriptive names for translation keys
2. **Group related translations**: Keep related translations together in the interface
3. **Use consistent naming**: Follow a consistent naming convention (camelCase)
4. **Test all languages**: Make sure to test the app in all supported languages
5. **Consider text length**: Some languages may need more space than others
6. **RTL support**: For RTL languages like Arabic, ensure proper CSS support

## Adding New Translation Keys

When you need to add new text to the app:

1. Add the key to the `Translations` interface in `src/lib/translations.ts`
2. Add the translation for all supported languages
3. Use `t.keyName` in your component
4. Import `useTranslations` from `@/lib/translations`

```typescript
// In your component
import { useTranslations } from '@/lib/translations';

function MyComponent() {
  const { state } = useApp();
  const t = useTranslations(state.language);
  
  return <h1>{t.myNewKey}</h1>;
}
```

This system makes it very easy to maintain and expand the multilingual support of the application.

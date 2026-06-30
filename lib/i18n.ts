import ar from '@/messages/ar.json';
import en from '@/messages/en.json';
import nl from '@/messages/nl.json';
import tr from '@/messages/tr.json';

export type Locale = 'nl' | 'en' | 'ar' | 'tr';

export const locales: Locale[] = ['nl', 'en', 'ar', 'tr'];
export const defaultLocale: Locale = 'nl';

export type Messages = typeof nl;

const dictionaries: Record<Locale, Messages> = { nl, en, ar, tr };

export function parseLocale(locale: string | null | undefined): Locale {
  if (!locale) {
    return defaultLocale;
  }

  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export function getLocaleFromSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined,
): Locale {
  const value = searchParams?.lang;
  const raw = Array.isArray(value) ? value[0] : value;
  return parseLocale(raw);
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

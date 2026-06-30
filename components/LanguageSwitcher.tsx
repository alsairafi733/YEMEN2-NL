import { Locale, locales } from '@/lib/i18n';

type Props = {
  currentLocale: Locale;
  path: string;
};

export default function LanguageSwitcher({ currentLocale, path }: Props) {
  return (
    <div className="lang-switcher" aria-label="Language switcher">
      {locales.map((locale) => (
        <a
          key={locale}
          href={`${path}?lang=${locale}`}
          className={locale === currentLocale ? 'active' : ''}
        >
          {locale.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

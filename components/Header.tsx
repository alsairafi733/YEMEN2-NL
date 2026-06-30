import { Locale, Messages } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

type Props = {
  locale: Locale;
  messages: Messages;
  path: string;
};

export default function Header({ locale, messages, path }: Props) {
  return (
    <header className="site-header">
      <a href={`/?lang=${locale}`} className="brand">
        YEMEN2 NL
      </a>

      <nav>
        <a href={`/?lang=${locale}`}>{messages.nav.home}</a>
        <a href={`/pricing?lang=${locale}`}>{messages.nav.pricing}</a>
        <a href={`/dashboard?lang=${locale}`}>{messages.nav.dashboard}</a>
        <a href={`/about?lang=${locale}`}>{messages.nav.about}</a>
        <a href={`/contact?lang=${locale}`}>{messages.nav.contact}</a>
      </nav>

      <LanguageSwitcher currentLocale={locale} path={path} />
    </header>
  );
}

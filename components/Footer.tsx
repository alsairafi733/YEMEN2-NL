import { Locale, Messages } from '@/lib/i18n';

type Props = {
  locale: Locale;
  messages: Messages;
};

export default function Footer({ locale, messages }: Props) {
  return (
    <footer className="site-footer">
      <p>{messages.footer.tagline}</p>
      <p>{messages.footer.contact}</p>
      <div className="links">
        <a href={`/privacy?lang=${locale}`}>{messages.footer.privacy}</a>
        <a href={`/terms?lang=${locale}`}>{messages.footer.terms}</a>
      </div>
    </footer>
  );
}

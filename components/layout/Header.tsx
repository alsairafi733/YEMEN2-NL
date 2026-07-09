'use client';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  locale: string;
  title?: string;
  onMenuToggle?: () => void;
}

export function Header({ locale, title, onMenuToggle }: HeaderProps) {
  const router = useRouter();

  const toggleDark = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const switchLocale = (newLocale: string) => {
    const path = window.location.pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
  };

  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 bg-white dark:bg-gray-900">
      {/* Hamburger — visible on mobile only */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {title && <h1 className="font-bold text-sm hidden lg:block">{title}</h1>}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <button
          onClick={() => switchLocale(locale === 'ar' ? 'en' : 'ar')}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {locale === 'ar' ? 'EN' : 'عربي'}
        </button>

        {/* Dark mode */}
        <button
          onClick={toggleDark}
          className="w-8 h-8 flex items-center justify-center rounded-lg
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base"
          title="Toggle dark mode"
        >
          🌙
        </button>

        {/* Notifications */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg relative
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-base"
        >
          🔔
          <span className="absolute top-1 end-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}

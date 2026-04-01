import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Code2, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogoText } from './LogoText';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Don't show navbar on admin routes
  if (isAdminRoute) {
    return null;
  }

  const links = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.projects'), path: '/projects' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const changeLanguage = (code: string) => {
    console.log('Changing language to:', code);
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    let isUnmounted = false;

    const updateVisitorCount = async () => {
      const namespace = 'shehroz-shafiq-portfolio';
      const key = 'total-visitors';
      const sessionKey = 'portfolio_visit_counted_v1';
      const shouldIncrement = !sessionStorage.getItem(sessionKey);
      const endpoint = shouldIncrement
        ? `https://api.countapi.xyz/hit/${namespace}/${key}`
        : `https://api.countapi.xyz/get/${namespace}/${key}`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (!isUnmounted && typeof data?.value === 'number') {
          setVisitorCount(data.value);
        }
        if (shouldIncrement) {
          sessionStorage.setItem(sessionKey, 'true');
        }
      } catch (error) {
        console.error('Visitor counter error:', error);
      }
    };

    updateVisitorCount();
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl mt-4 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
        {/* Logo side */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-[0_12px_30px_rgba(37,99,235,0.55)] group-hover:shadow-[0_18px_40px_rgba(37,99,235,0.7)] transition-shadow duration-200">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="pointer-events-none absolute inset-px rounded-xl border border-white/40 opacity-70" />
            <div className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-12 -translate-x-1/2 bg-blue-500/30 blur-md opacity-70" />
          </div>
          <LogoText
            className="font-semibold text-lg tracking-tight text-[#111827] hidden sm:block"
            fullText={t('navbar.full_name')}
          />
        </Link>

        {/* Nav links & Language Switcher */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1D4ED8] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold">Visitors: {visitorCount ?? '...'}</span>
          </div>

          <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1D4ED8] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-semibold">{visitorCount ?? '...'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-50/60 rounded-full px-1.5 py-1 border border-slate-200/60 shadow-inner">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative"
                >
                  <motion.span
                    className={`inline-flex items-center justify-center px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      isActive
                        ? 'text-[#1D4ED8]'
                        : 'text-[#6B7280] hover:text-[#111827]'
                    }`}
                    whileHover={{ y: -1, scale: 1.02 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {link.name}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_10px_25px_rgba(37,99,235,0.22)] -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-10 h-10 p-0 hover:bg-slate-100 flex items-center justify-center"
              >
                <Languages className="w-5 h-5 text-[#6B7280]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-white/95 backdrop-blur-md">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onSelect={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-3 cursor-pointer py-2 px-3 transition-colors ${
                    i18n.language?.startsWith(lang.code) ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
}

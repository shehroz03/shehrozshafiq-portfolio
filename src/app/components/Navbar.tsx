import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { LogoText } from './LogoText';

export function Navbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Don't show navbar on admin routes
  if (isAdminRoute) {
    return null;
  }

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

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
            fullText="Shehroz Shafiq – Portfolio"
          />
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-2 bg-slate-50/60 rounded-full px-1.5 py-1 border border-slate-200/60 shadow-inner">
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
      </div>
    </motion.nav>
  );
}

import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, ArrowUp, ArrowUpRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '../utils/animations';
import { contactInfo, socialLinks } from '../data/contact';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const links = [
    { label: t('navbar.home'), to: '/' },
    { label: t('navbar.projects'), to: '/projects' },
    { label: t('navbar.about'), to: '/about' },
    { label: t('navbar.contact'), to: '/contact' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-gradient-to-b from-white to-[#F7F9FC] border-t border-gray-200/80 overflow-hidden">
      {/* Top accent gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Soft ambient glow */}
      <div className="absolute -top-20 left-1/4 w-96 h-40 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-14 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-10 mb-10"
        >
          {/* Brand */}
          <motion.div variants={staggerItem} className="space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                style={{ boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)' }}
              >
                SS
              </div>
              <div>
                <h3 className="font-bold text-[#2E2E2E]">Shehroz Shafiq</h3>
                <p className="text-xs text-[#6B7280]">{t('hero.subtitle')}</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
              {t('footer.brand_description')}
            </p>

            {/* Contact mini-info */}
            <div className="space-y-2 pt-1">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2.5 text-sm text-[#6B7280] hover:text-[#4A90E2] transition-colors w-fit group"
              >
                <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#4A90E2] group-hover:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                {contactInfo.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm text-[#6B7280]">
                <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#4A90E2]">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                {contactInfo.location}
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={staggerItem} className="space-y-4 md:pl-4">
            <h4 className="font-semibold text-[#2E2E2E] text-sm uppercase tracking-wider">
              {t('footer.quick_links')}
            </h4>
            <nav className="flex flex-col space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#4A90E2] transition-colors w-fit py-1"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  <span className="-ml-5 group-hover:ml-0 transition-all duration-200">{link.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={staggerItem} className="space-y-5">
            <h4 className="font-semibold text-[#2E2E2E] text-sm uppercase tracking-wider">
              {t('footer.connect')}
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#6B7280] border border-gray-100 ${social.color} transition-colors`}
                    style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }}
                    aria-label={social.name}
                    title={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-green-50 rounded-full border border-green-200/60 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs font-medium text-green-700">
                {t('footer.available_freelance')}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="pt-8 border-t border-gray-200/80"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#6B7280]">
              © {currentYear} Shehroz Shafiq. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-5">
              <p className="text-xs text-[#6B7280]">{t('footer.built_with')}</p>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center"
                style={{ boxShadow: '0 6px 16px rgba(37, 99, 235, 0.35)' }}
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

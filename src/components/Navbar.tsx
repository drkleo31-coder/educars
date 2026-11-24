import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND_LOGO_PATH } from '../data/educars';
import { buildWhatsAppUrl } from '../utils/whatsapp';

const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#antes-depois', label: 'Antes e Depois' },
  { href: '#detalhes', label: 'Detalhes' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#localizacao', label: 'Localização' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const whatsAppUrl = buildWhatsAppUrl();

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#070908]/92 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-b from-[#070908]/85 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark + emblem */}
        <a
          href="#inicio"
          onClick={() => setIsMobileMenuOpen(false)}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md"
        >
          <span className="w-9 h-9 rounded-md overflow-hidden border border-emerald-500/30 bg-[#0A0E0C] shrink-0">
            <img
              src={BRAND_LOGO_PATH}
              alt="Logo oficial EDU CARS"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            <span className="text-emerald-400">Edu</span>CARS
          </span>
        </a>

        {/* Zone 2: 5 single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 text-zinc-300 hover:text-white transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-md bg-emerald-500 hover:bg-emerald-400 text-[#05110B] text-xs font-bold tracking-wide uppercase transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <span>Agendar</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-white/10 bg-[#111513] text-zinc-100 hover:border-emerald-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Menu mobile"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-white/10 bg-[#0A0D0B] px-4 pt-3 pb-5"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 min-h-[44px] flex items-center justify-between text-base font-medium text-zinc-200 hover:text-emerald-400 hover:bg-white/[0.03] rounded-md transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-zinc-500" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-[#05110B] text-sm font-bold tracking-wide uppercase transition-colors"
              >
                <span>AGENDAR PELO WHATSAPP</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

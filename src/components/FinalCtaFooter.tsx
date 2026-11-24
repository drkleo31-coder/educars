import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { BRAND_LOGO_PATH } from '../data/educars';
import {
  CONFIRMED_ADDRESS,
  GOOGLE_MAPS_DIRECTIONS_URL,
  WHATSAPP_DISPLAY_PHONE,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

export function FinalCtaFooter() {
  const shouldReduceMotion = useReducedMotion();
  const whatsAppUrl = buildWhatsAppUrl();

  return (
    <>
      {/* Final Editorial CTA */}
      <section className="py-20 lg:py-24 bg-[#070908] border-t border-white/10 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.12)_0%,transparent_65%)] pointer-events-none"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
              EDU CARS · Atendimento Especializado
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Pronto para devolver o destaque que o seu carro merece?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Converse diretamente pelo WhatsApp para tirar dúvidas sobre os serviços ou agendar um atendimento em Pirassununga.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-[#05110B] text-sm font-bold tracking-wide uppercase transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                <span>AGENDAR PELO WHATSAPP</span>
              </a>

              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-white/15 bg-[#111513] hover:border-emerald-400/40 text-zinc-200 text-sm font-semibold tracking-wide uppercase transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>COMO CHEGAR</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#050706] border-t border-white/10 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-md overflow-hidden border border-emerald-500/30 bg-black shrink-0">
                  <img
                    src={BRAND_LOGO_PATH}
                    alt="Logo EDU CARS"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-white">
                    <span className="text-emerald-400">Edu</span>CARS
                  </p>
                  <p className="text-xs text-zinc-400">
                    Especialista em cuidar do seu carro.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Navegação
              </p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-400">
                <li>
                  <a href="#servicos" className="hover:text-emerald-400 transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#antes-depois" className="hover:text-emerald-400 transition-colors">
                    Antes e Depois
                  </a>
                </li>
                <li>
                  <a href="#detalhes" className="hover:text-emerald-400 transition-colors">
                    Paixão pelos Detalhes
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-emerald-400 transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#localizacao" className="hover:text-emerald-400 transition-colors">
                    Localização
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Contato e Endereço
              </p>
              <div className="mt-3 space-y-2.5 text-sm text-zinc-400">
                <p>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono tabular-nums text-zinc-200 hover:text-emerald-400 transition-colors"
                  >
                    WhatsApp: {WHATSAPP_DISPLAY_PHONE}
                  </a>
                </p>
                <address className="not-italic leading-relaxed">
                  {CONFIRMED_ADDRESS}
                </address>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} EDU CARS. Todos os direitos reservados.</p>
            <p>Desenvolvido por SHARK CODER</p>
          </div>
        </div>
      </footer>
    </>
  );
}

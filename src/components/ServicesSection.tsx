import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/educars';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  onSelectServiceForSchedule: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectServiceForSchedule }: ServicesSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleScheduleJump = (service: ServiceItem) => {
    onSelectServiceForSchedule(service.title);
    const target = document.getElementById('agendamento');
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="servicos"
      className="scroll-mt-16 py-20 lg:py-28 bg-[#0B0E0C] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Heading */}
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
            Serviços Especializados
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
            Cuidado técnico para cada superfície do veículo.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Quatro serviços essenciais pensados para preservar a estética, a limpeza técnica e o acabamento original do seu automóvel.
          </p>
        </div>

        {/* 4 Confirmed Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const directWhatsAppUrl = buildWhatsAppUrl({ service: service.title });

            return (
              <motion.article
                key={service.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-xl border border-white/10 bg-[#111513] overflow-hidden flex flex-col transition-colors duration-200 hover:border-emerald-500/40"
              >
                {/* Representative Photography with Subtle Glint */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#070908]">
                  <ResilientImage
                    src={service.image}
                    alt={service.imageAlt}
                    fallbackLabel={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#111513] via-transparent to-black/20"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-4 text-xs text-zinc-400">
                    <span className="font-semibold text-emerald-400">{service.index}.</span>
                    <span className="truncate">{service.focusArea}</span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm text-zinc-300">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="w-4 h-4 text-lime-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Actions */}
                  <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-[#05110B] text-xs font-bold tracking-wide uppercase transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                    >
                      <span>Consultar no WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleScheduleJump(service)}
                      className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-md border border-white/10 hover:border-emerald-400/40 bg-transparent hover:bg-white/[0.04] text-zinc-200 text-xs font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      Selecionar no agendamento
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

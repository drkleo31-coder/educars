import { motion, useReducedMotion } from 'motion/react';
import { BRAND_LOGO_PATH, INSTITUTIONAL_PILLARS } from '../data/educars';

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="scroll-mt-16 py-20 lg:py-28 bg-[#070908] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Official Brand Emblem Studio Presentation */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0C100E] p-6 sm:p-8 overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-500/12 blur-[90px]"
              />
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black border border-white/5">
                <img
                  src={BRAND_LOGO_PATH}
                  alt="Logo oficial EDU CARS — Especialista em cuidar do seu carro"
                  loading="lazy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span>EDU CARS</span>
                <span className="text-emerald-400 font-medium">
                  Pirassununga · SP
                </span>
              </div>
            </div>
          </motion.div>

          {/* Institutional Copy & Pillars */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
              Sobre a EDU CARS
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Especialista em cuidar do seu carro.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-zinc-300 leading-relaxed">
              Na EDU CARS, cada veículo é tratado com dedicação, paciência e olhar criterioso. O compromisso está em valorizar a aparência do seu carro por inteiro — da nitidez dos vidros e faróis ao brilho da pintura, passando pelo cuidado técnico com o motor e pela conservação dos painéis internos.
            </p>
            <p className="mt-4 text-base text-zinc-400 leading-relaxed">
              Sem pressa e sem soluções genéricas: o atendimento começa ouvindo o que o seu automóvel precisa e segue com respeito a cada superfície.
            </p>

            {/* 4 Unboxed Editorial Pillars */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {INSTITUTIONAL_PILLARS.map((pillar) => (
                <div key={pillar.index}>
                  <p className="text-xs font-semibold text-emerald-400">
                    {pillar.index}. {pillar.title}
                  </p>
                  <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

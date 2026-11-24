import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { BRAND_LOGO_PATH, HERO_CAR_IMAGE } from '../data/educars';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  const whatsAppUrl = buildWhatsAppUrl();

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[660px] lg:min-h-[820px] pt-20 pb-14 lg:pt-28 lg:pb-20 overflow-hidden bg-[#070908] flex items-center"
    >
      {/* Background Sports Car Photography with Parallax & Emerald Studio Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={shouldReduceMotion ? undefined : { scale: imageScale, y: imageY }}
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <ResilientImage
            src={HERO_CAR_IMAGE}
            alt="Carro esportivo em estúdio escuro de estética automotiva com iluminação verde esmeralda"
            eager
            fallbackLabel="EDU CARS · Estúdio Automotivo"
            className="w-full h-full object-cover object-[72%_52%] sm:object-[68%_54%] lg:object-[74%_56%]"
          />
        </motion.div>

        {/* Measured Studio Scrims: protect left typography while letting the sports car shine on right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#070908]/95 via-[#070908]/75 lg:via-[#070908]/55 to-[#070908]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#070908] via-transparent to-[#070908]/65"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 w-96 h-96 rounded-full bg-emerald-500/12 blur-[120px]"
        />
        {/* Subtle Light Sweep Passing Across the Composition */}
        <div
          aria-hidden="true"
          className="animate-light-sweep absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-300/12 to-transparent"
        />
      </div>

      {/* Foreground Content */}
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-2xl">
          {/* Official EDU CARS Logo + Unboxed Identity Line */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-emerald-500/35 bg-black shadow-[0_0_24px_rgba(16,185,129,0.18)] shrink-0">
              <img
                src={BRAND_LOGO_PATH}
                alt="Logo oficial EDU CARS — Especialista em cuidar do seu carro"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-xs sm:text-sm font-medium tracking-wide flex flex-col gap-0.5">
              <span className="text-emerald-400 font-semibold">EDU CARS</span>
              <span className="text-zinc-200">Especialista em cuidar do seu carro.</span>
              <span className="text-zinc-400 text-xs">Pirassununga · SP</span>
            </div>
          </motion.div>

          {/* Primary Hero Headline */}
          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,4.5vw,4.15rem)] font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance]"
          >
            Seu carro merece cuidado de especialista.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-base sm:text-lg lg:text-xl text-zinc-200 leading-relaxed max-w-xl"
          >
            Da cristalização ao acabamento, cada detalhe faz a diferença.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-md bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-[#05110B] text-sm font-bold tracking-wide uppercase transition-all duration-150 shadow-[0_0_28px_rgba(16,185,129,0.25)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <MessageCircle className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
              <span>AGENDAR PELO WHATSAPP</span>
            </a>

            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3.5 rounded-md border border-white/20 bg-[#111513]/80 hover:bg-[#1A201D] hover:border-emerald-400/50 text-zinc-100 text-sm font-semibold tracking-wide uppercase transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>CONHECER SERVIÇOS</span>
              <ArrowDownRight className="w-4 h-4 text-lime-400" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Hairline Scroll Strip Below Hero Split with Subtle Lime/Emerald Accent */}
        <div className="mt-12 lg:mt-20 pt-6 border-t border-white/10 relative grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div
            aria-hidden="true"
            className="absolute -top-px left-0 w-28 h-px bg-gradient-to-r from-lime-400 via-emerald-400 to-transparent"
          />
          <div>
            <p className="text-xs text-zinc-400">01 · Vidros e Faróis</p>
            <p className="mt-1 font-medium text-white">Cristalização ótica</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">02 · Cofre do Motor</p>
            <p className="mt-1 font-medium text-white">Lavagem técnica</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">03 · Lataria e Brilho</p>
            <p className="mt-1 font-medium text-white">Polimento automotivo</p>
          </div>
          <div>
            <p className="text-xs text-zinc-400">04 · Cabine Interna</p>
            <p className="mt-1 font-medium text-white">Revitalização de painéis</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

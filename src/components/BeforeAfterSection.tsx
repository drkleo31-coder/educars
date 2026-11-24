import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MoveHorizontal, Play, Pause, RotateCcw } from 'lucide-react';
import { BEFORE_AFTER_ASSETS } from '../data/educars';
import { calculateSliderPercentage, stepSliderPercentage } from '../utils/slider';
import { ResilientImage } from './ResilientImage';

export function BeforeAfterSection() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSliderPos(calculateSliderPercentage(clientX, rect.left, rect.width));
  }, []);

  // Optional gentle automatic reveal animation
  useEffect(() => {
    if (!isAutoPlaying || shouldReduceMotion) return;

    let rafId = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Smooth sine sweep between 15% and 85%
      const value = 50 + Math.sin(elapsed * 1.15) * 35;
      setSliderPos(Math.round(value * 10) / 10);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoPlaying, shouldReduceMotion]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsAutoPlaying(false);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIsAutoPlaying(false);
      setSliderPos((prev) => stepSliderPercentage(prev, -5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIsAutoPlaying(false);
      setSliderPos((prev) => stepSliderPercentage(prev, 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIsAutoPlaying(false);
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setIsAutoPlaying(false);
      setSliderPos(100);
    }
  };

  return (
    <section
      id="antes-depois"
      className="scroll-mt-16 py-20 lg:py-28 bg-[#070908] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Narrative & Controls Column */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
              Experiência Interativa · Cristalização de Faróis
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              O cuidado está nos detalhes.
            </h2>
            <p className="mt-4 text-base text-zinc-300 leading-relaxed">
              Arraste o controle horizontal sobre a imagem para comparar o aspecto visual de um farol opaco antes do processo e a transparência cristalina após a cristalização.
            </p>

            {/* Interactive Playback & Quick Position Controls */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                aria-pressed={isAutoPlaying}
                className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-md text-xs font-bold tracking-wide uppercase transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isAutoPlaying
                    ? 'bg-emerald-500 text-[#05110B] hover:bg-emerald-400'
                    : 'bg-[#111513] text-zinc-100 border border-white/15 hover:border-emerald-400/40'
                }`}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pausar demonstração</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    <span>Demonstração automática</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setSliderPos(50);
                }}
                aria-label="Centralizar comparador em 50%"
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-md border border-white/10 bg-transparent hover:bg-white/[0.04] text-zinc-300 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Centralizar</span>
              </button>
            </div>

            {/* Accessible Slider Bar + Live Percentage */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>ANTES (Opaco)</span>
                <span className="font-mono tabular-nums text-emerald-400 font-semibold">
                  {Math.round(sliderPos)}% revelado
                </span>
                <span>DEPOIS (Cristalino)</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(sliderPos)}
                aria-label="Controle de comparação entre farol opaco e farol cristalizado"
                onChange={(e) => {
                  setIsAutoPlaying(false);
                  setSliderPos(Number(e.target.value));
                }}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#1A201D] accent-emerald-500"
              />
              <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                Demonstração visual ilustrativa do efeito de cristalização. As imagens exibem uma simulação comparativa para demonstrar o contraste entre opacidade e transparência.
              </p>
            </div>
          </motion.div>

          {/* Interactive Comparison Frame */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div
              ref={containerRef}
              data-testid="before-after-slider"
              role="slider"
              tabIndex={0}
              aria-label="Comparador interativo antes e depois da cristalização de faróis"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPos)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              style={{ touchAction: 'pan-y' }}
              className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/15 bg-[#111513] select-none cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {/* Base Layer: DEPOIS (Crystal Clear Headlight) */}
              <div className="absolute inset-0">
                <ResilientImage
                  src={BEFORE_AFTER_ASSETS.afterImage}
                  alt={BEFORE_AFTER_ASSETS.afterAlt}
                  fallbackLabel="Depois · Farol Cristalino"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Clipped Top Layer: ANTES (Opaque Oxidized Headlight) */}
              <div
                aria-hidden="true"
                style={{
                  clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
                className="absolute inset-0 will-change-[clip-path]"
              >
                <ResilientImage
                  src={BEFORE_AFTER_ASSETS.beforeImage}
                  alt={BEFORE_AFTER_ASSETS.beforeAlt}
                  fallbackLabel="Antes · Farol Opaco"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Corner Labels */}
              <div className="pointer-events-none absolute top-4 left-4 z-20 px-3 py-1.5 rounded bg-black/75 backdrop-blur-sm border border-white/15 text-xs font-bold tracking-wider text-zinc-200">
                ANTES
              </div>
              <div className="pointer-events-none absolute top-4 right-4 z-20 px-3 py-1.5 rounded bg-emerald-950/85 backdrop-blur-sm border border-emerald-400/40 text-xs font-bold tracking-wider text-emerald-300">
                DEPOIS
              </div>

              {/* Vertical Divider & Drag Handle */}
              <div
                aria-hidden="true"
                style={{ left: `${sliderPos}%` }}
                className="pointer-events-none absolute inset-y-0 z-30 -translate-x-1/2 flex flex-col items-center justify-center"
              >
                <div className="w-0.5 h-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.75)]" />
                <div className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#070908]/95 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center shadow-lg">
                  <MoveHorizontal className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

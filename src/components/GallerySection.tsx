import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/educars';
import { ResilientImage } from './ResilientImage';

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeItem: GalleryItem | null =
    activeIndex !== null ? GALLERY_ITEMS[activeIndex] ?? null : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section
      id="detalhes"
      className="scroll-mt-16 py-20 lg:py-28 bg-[#0B0E0C] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
              Paixão pelos Detalhes
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
              Onde a iluminação encontra o acabamento.
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Galeria demonstrativa de estética automotiva, estruturada para receber os registros fotográficos reais realizados no estúdio da EDU CARS.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {GALLERY_ITEMS.map((item, idx) => {
            const colSpanClass =
              item.span === 'wide' ? 'lg:col-span-7' : 'lg:col-span-5';
            // Alternate span cleanly per row on 12-col desktop grid:
            // Row 1: 7 + 5, Row 2: 5 + 7? Let's make exact 12-col rows:
            // Item 0 (wide: 7), Item 1 (standard: 5) -> 12
            // Item 2 (standard: 4), Item 3 (standard: 4), Item 4 (standard: 4) -> 12
            // Item 5 (wide: 12 or full feature? Wait: 6 items -> 7+5, 6+6, 5+7!)
            const rowAwareClass =
              idx === 0
                ? 'lg:col-span-7'
                : idx === 1
                ? 'lg:col-span-5'
                : idx === 2
                ? 'lg:col-span-4'
                : idx === 3
                ? 'lg:col-span-4'
                : idx === 4
                ? 'lg:col-span-4'
                : 'lg:col-span-12';

            const aspectClass =
              idx === 5 ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]';

            return (
              <motion.div
                key={item.id}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 3) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${colSpanClass} ${rowAwareClass}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Ampliar foto: ${item.title}`}
                  className={`group relative w-full ${aspectClass} rounded-xl overflow-hidden border border-white/10 bg-[#070908] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    fallbackLabel={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />

                  {/* Contrast Scrim & Subtle Emerald Studio Glow on Hover */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent"
                  />

                  {/* Caption Content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-emerald-400">
                        {item.category}
                      </p>
                      <h3 className="mt-1 font-display text-lg sm:text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-zinc-300 line-clamp-2 max-w-xl">
                        {item.caption}
                      </p>
                    </div>
                    <span className="shrink-0 w-9 h-9 rounded-md border border-white/15 bg-black/60 text-zinc-200 group-hover:border-emerald-400/50 group-hover:text-emerald-300 flex items-center justify-center transition-colors">
                      <Expand className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-xl border border-white/15 bg-[#0B0E0C] overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
                <div>
                  <p className="text-xs text-emerald-400 font-medium">
                    {activeItem.category} · Imagem demonstrativa
                  </p>
                  <h3 className="font-display text-lg font-bold text-white">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Fechar visualização"
                  className="w-10 h-10 rounded-md border border-white/10 hover:border-emerald-400/40 text-zinc-200 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="relative aspect-[16/10] bg-black">
                <ResilientImage
                  src={activeItem.image}
                  alt={activeItem.imageAlt}
                  eager
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="px-5 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-zinc-300">{activeItem.caption}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label="Imagem anterior"
                    onClick={() =>
                      setActiveIndex(
                        (activeIndex - 1 + GALLERY_ITEMS.length) %
                          GALLERY_ITEMS.length
                      )
                    }
                    className="w-10 h-10 rounded-md border border-white/15 hover:border-emerald-400/50 text-zinc-200 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs font-mono tabular-nums text-zinc-400 px-2">
                    {activeIndex + 1} / {GALLERY_ITEMS.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Próxima imagem"
                    onClick={() =>
                      setActiveIndex((activeIndex + 1) % GALLERY_ITEMS.length)
                    }
                    className="w-10 h-10 rounded-md border border-white/15 hover:border-emerald-400/50 text-zinc-200 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

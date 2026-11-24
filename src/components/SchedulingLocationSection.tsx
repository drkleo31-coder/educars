import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Copy,
  Check,
} from 'lucide-react';
import { SERVICES } from '../data/educars';
import {
  CONFIRMED_ADDRESS,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
  WHATSAPP_DISPLAY_PHONE,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/whatsapp';

interface SchedulingLocationSectionProps {
  selectedService: string;
  onSelectService: (service: string) => void;
}

export function SchedulingLocationSection({
  selectedService,
  onSelectService,
}: SchedulingLocationSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const messageOptions = {
    service: selectedService || undefined,
    customerName: customerName || undefined,
    vehicleModel: vehicleModel || undefined,
  };

  const previewMessage = buildWhatsAppMessage(messageOptions);
  const whatsAppUrl = buildWhatsAppUrl(messageOptions);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(previewMessage);
      setCopied(true);
    } catch {
      // Fallback ignored silently if clipboard permission is unavailable
    }
  };

  return (
    <section
      id="localizacao"
      className="scroll-mt-16 py-20 lg:py-28 bg-[#0B0E0C] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Column 1: Interactive WhatsApp Scheduling Builder */}
          <motion.div
            id="agendamento"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-20 lg:col-span-6 rounded-xl border border-white/10 bg-[#111513] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
                Agendamento pelo WhatsApp
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white [text-wrap:balance]">
                Prepare sua mensagem e fale direto com a EDU CARS.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                Escolha o serviço de interesse para enviar sua solicitação diretamente pelo WhatsApp oficial da empresa.
              </p>

              {/* Service Selector */}
              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="service-select"
                    className="block text-xs font-semibold text-zinc-300 mb-2"
                  >
                    Serviço desejado
                  </label>
                  <select
                    id="service-select"
                    value={selectedService}
                    onChange={(e) => onSelectService(e.target.value)}
                    className="w-full min-h-[46px] px-3.5 py-2.5 rounded-md border border-white/15 bg-[#070908] text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <option value="">
                      Atendimento geral / Conhecer os serviços
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="customer-name"
                      className="block text-xs font-semibold text-zinc-300 mb-2"
                    >
                      Seu nome (opcional)
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex.: Carlos"
                      maxLength={60}
                      className="w-full min-h-[46px] px-3.5 py-2.5 rounded-md border border-white/15 bg-[#070908] text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vehicle-model"
                      className="block text-xs font-semibold text-zinc-300 mb-2"
                    >
                      Modelo do veículo (opcional)
                    </label>
                    <input
                      id="vehicle-model"
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="Ex.: Civic, Corolla, Polo"
                      maxLength={60}
                      className="w-full min-h-[46px] px-3.5 py-2.5 rounded-md border border-white/15 bg-[#070908] text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    />
                  </div>
                </div>

                {/* Live Message Preview */}
                <div className="rounded-lg border border-white/10 bg-[#070908] p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-zinc-400">
                      Prévia da mensagem para {WHATSAPP_DISPLAY_PHONE}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded px-1.5 py-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copiar texto</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p
                    data-testid="whatsapp-message-preview"
                    className="text-xs sm:text-sm text-zinc-200 leading-relaxed"
                  >
                    {previewMessage}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="schedule-whatsapp-link"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-md bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-[#05110B] text-sm font-bold tracking-wide uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                <span>AGENDAR PELO WHATSAPP</span>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Location & Google Maps */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-xl border border-white/10 bg-[#111513] p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-emerald-400">
                Localização
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-white [text-wrap:balance]">
                Atendimento em Pirassununga - SP.
              </h2>

              <div className="mt-5 space-y-3 text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-emerald-400 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <address className="not-italic leading-relaxed text-zinc-200">
                    {CONFIRMED_ADDRESS}
                  </address>
                </div>

                <div className="flex items-center gap-3">
                  <Phone
                    className="w-4 h-4 text-emerald-400 shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono tabular-nums text-zinc-200 hover:text-emerald-400 transition-colors"
                  >
                    {WHATSAPP_DISPLAY_PHONE}
                  </a>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="mt-6 relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-white/10 bg-[#070908]">
                <iframe
                  title="Mapa de localização da EDU CARS em Pirassununga - SP"
                  src={GOOGLE_MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0 grayscale-[35%] contrast-[1.05]"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-white/15 bg-[#070908] hover:bg-[#1A201D] hover:border-emerald-400/40 text-white text-sm font-bold tracking-wide uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Navigation className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>COMO CHEGAR</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

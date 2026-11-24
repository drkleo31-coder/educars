export const WHATSAPP_BASE_URL = 'https://wa.me/55199991600829';
export const WHATSAPP_DISPLAY_PHONE = '(19) 99916-00829';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Conheci a EDU CARS pelo site e gostaria de saber mais sobre os serviços e agendar um atendimento.';

export const CONFIRMED_ADDRESS =
  'Rua Evásio Peres, 487, Jardim Venesall, Pirassununga - SP, 13630-830, Brasil';

export const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONFIRMED_ADDRESS
)}`;

export const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  CONFIRMED_ADDRESS
)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export interface WhatsAppMessageOptions {
  service?: string;
  customerName?: string;
  vehicleModel?: string;
}

export function buildWhatsAppMessage(options: WhatsAppMessageOptions = {}): string {
  const parts: string[] = [DEFAULT_WHATSAPP_MESSAGE];

  const cleanService = options.service?.trim();
  const cleanVehicle = options.vehicleModel?.trim();
  const cleanName = options.customerName?.trim();

  if (cleanService) {
    parts.push(`Serviço de interesse: ${cleanService}.`);
  }
  if (cleanVehicle) {
    parts.push(`Veículo: ${cleanVehicle}.`);
  }
  if (cleanName) {
    parts.push(`Nome: ${cleanName}.`);
  }

  return parts.join(' ');
}

export function buildWhatsAppUrl(options: WhatsAppMessageOptions = {}): string {
  const message = buildWhatsAppMessage(options);
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

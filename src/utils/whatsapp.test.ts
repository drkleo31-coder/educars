import test from 'node:test';
import assert from 'node:assert/strict';
import {
  WHATSAPP_BASE_URL,
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from './whatsapp';

test('buildWhatsAppMessage returns exact required greeting when no options passed', () => {
  assert.equal(buildWhatsAppMessage(), DEFAULT_WHATSAPP_MESSAGE);
});

test('buildWhatsAppMessage appends selected service, vehicle, and name cleanly', () => {
  const msg = buildWhatsAppMessage({
    service: 'Polimento Automotivo',
    vehicleModel: 'Civic Touring',
    customerName: 'Rafael',
  });
  assert.ok(msg.startsWith(DEFAULT_WHATSAPP_MESSAGE));
  assert.ok(msg.includes('Serviço de interesse: Polimento Automotivo.'));
  assert.ok(msg.includes('Veículo: Civic Touring.'));
  assert.ok(msg.includes('Nome: Rafael.'));
});

test('buildWhatsAppMessage trims whitespace and ignores empty optional fields', () => {
  const msg = buildWhatsAppMessage({
    service: '  Lavagem Técnica de Motor  ',
    vehicleModel: '   ',
    customerName: '',
  });
  assert.equal(
    msg,
    `${DEFAULT_WHATSAPP_MESSAGE} Serviço de interesse: Lavagem Técnica de Motor.`
  );
});

test('buildWhatsAppUrl encodes text parameter onto confirmed wa.me link', () => {
  const url = buildWhatsAppUrl({ service: 'Cristalização de Vidros e Faróis' });
  assert.ok(url.startsWith(`${WHATSAPP_BASE_URL}?text=`));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes(DEFAULT_WHATSAPP_MESSAGE));
  assert.ok(decoded.includes('Cristalização de Vidros e Faróis'));
});

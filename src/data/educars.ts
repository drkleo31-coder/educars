export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortLabel: string;
  focusArea: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  imageAlt: string;
  span: 'wide' | 'standard';
}

export interface InstitutionalPillar {
  index: string;
  title: string;
  description: string;
}

export const BRAND_LOGO_PATH = '/assets/aistudio/IMG_5608_f156e71d.png';
export const HERO_CAR_IMAGE = '/src/assets/images/hero_sports_car_1795555900392.jpg';

export const BEFORE_AFTER_ASSETS = {
  beforeImage: '/src/assets/images/service_headlight_opaque_1795555915387.jpg',
  beforeAlt: 'Demonstração ilustrativa de farol com lente opaca e amarelada antes da cristalização',
  afterImage: '/src/assets/images/service_headlight_clear_1795555901138.jpg',
  afterAlt: 'Demonstração ilustrativa do mesmo farol com lente cristalina e transparente após a cristalização',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'cristalizacao-vidros-farois',
    index: '01',
    title: 'Cristalização de Vidros e Faróis',
    shortLabel: 'Vidros e Faróis',
    focusArea: 'Transparência · Visibilidade · Proteção visual',
    description:
      'Cuidado especializado para devolver nitidez, clareza e melhor aspecto visual aos vidros e faróis do veículo, valorizando o conjunto ótico e a leitura da pista.',
    highlights: [
      'Melhoria visual da transparência das lentes',
      'Acabamento limpo nos vidros externos',
      'Realce estético na frente do veículo',
    ],
    image: '/src/assets/images/service_headlight_clear_1795555901138.jpg',
    imageAlt: 'Farol esportivo com lente cristalina e reflexo de estúdio',
  },
  {
    id: 'lavagem-tecnica-motor',
    index: '02',
    title: 'Lavagem Técnica de Motor',
    shortLabel: 'Motor',
    focusArea: 'Limpeza técnica · Cuidado estrutural · Conservação',
    description:
      'Limpeza cuidadosa e controlada do compartimento do motor, removendo sujeiras acumuladas sem descuidar dos componentes e mantendo um visual limpo e organizado.',
    highlights: [
      'Atenção dedicada a mangueiras, tampas e chicotes',
      'Acabamento uniforme sem aspecto engordurado',
      'Preservação estética do cofre do motor',
    ],
    image: '/src/assets/images/service_engine_bay_1795555901599.jpg',
    imageAlt: 'Compartimento de motor limpo e detalhado sob iluminação técnica',
  },
  {
    id: 'polimento-automotivo',
    index: '03',
    title: 'Polimento Automotivo',
    shortLabel: 'Polimento',
    focusArea: 'Pintura · Profundidade de brilho · Valorização',
    description:
      'Tratamento dedicado ao acabamento da pintura, suavizando marcas superficiais e devolvendo profundidade de cor, reflexo nítido e presença visual à lataria.',
    highlights: [
      'Realce do brilho e da uniformidade da pintura',
      'Reflexos limpos sob luz natural ou de estúdio',
      'Valorização visual de todo o exterior',
    ],
    image: '/src/assets/images/service_paint_polish_1795555901813.jpg',
    imageAlt: 'Capô escuro com pintura polida exibindo reflexo profundo de estúdio',
  },
  {
    id: 'revitalizacao-paineis',
    index: '04',
    title: 'Revitalização de Painéis',
    shortLabel: 'Painéis Internos',
    focusArea: 'Interior · Toque acetinado · Conservação',
    description:
      'Cuidado específico com os painéis internos e acabamentos da cabine, recuperando a aparência limpa, uniforme e bem conservada sem excesso de brilho artificial.',
    highlights: [
      'Aparência renovada nos painéis e consoles',
      'Acabamento discreto com aspecto de cuidado original',
      'Limpeza minuciosa em frestas e comandos',
    ],
    image: '/src/assets/images/service_interior_dashboard_1795555902252.jpg',
    imageAlt: 'Painel interno automotivo limpo e revitalizado com acabamento acetinado',
  },
];

/**
 * Galeria visual estruturada em módulo dedicado para fácil substituição
 * pelas fotografias reais produzidas no estúdio EDU CARS.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'reflexos-pintura',
    title: 'Reflexos na Pintura',
    category: 'Polimento & Acabamento',
    caption: 'Superfície espelhada sob luz direcional, evidenciando profundidade e nitidez na lataria.',
    image: '/src/assets/images/service_paint_polish_1795555901813.jpg',
    imageAlt: 'Reflexos definidos na pintura automotiva escura após polimento',
    span: 'wide',
  },
  {
    id: 'detalhes-farois',
    title: 'Ótica dos Faróis',
    category: 'Cristalização',
    caption: 'Clareza da lente e definição do conjunto frontal com foco na transparência visual.',
    image: '/src/assets/images/service_headlight_clear_1795555901138.jpg',
    imageAlt: 'Detalhe de farol esportivo com transparência cristalina',
    span: 'standard',
  },
  {
    id: 'acabamento-lataria',
    title: 'Gotículas e Lataria',
    category: 'Proteção Visual',
    caption: 'Acabamento limpo e uniforme que destaca curvas, vincos e brilho profundo da carroceria.',
    image: '/src/assets/images/gallery_paint_reflection_1795555915839.jpg',
    imageAlt: 'Gotículas de água sobre lataria escura com reflexo esmeralda',
    span: 'standard',
  },
  {
    id: 'interior-automotivo',
    title: 'Painel e Cabine',
    category: 'Revitalização Interna',
    caption: 'Texturas foscas preservadas, botões limpos e sensação de organização no interior.',
    image: '/src/assets/images/service_interior_dashboard_1795555902252.jpg',
    imageAlt: 'Interior automotivo com painel revitalizado e iluminação discreta',
    span: 'standard',
  },
  {
    id: 'detalhes-motor',
    title: 'Compartimento do Motor',
    category: 'Lavagem Técnica',
    caption: 'Cuidado técnico em cada duto, tampa e acabamento visível sob o capô.',
    image: '/src/assets/images/service_engine_bay_1795555901599.jpg',
    imageAlt: 'Compartimento do motor detalhado com limpeza técnica',
    span: 'standard',
  },
  {
    id: 'rodas-conjunto',
    title: 'Conjunto Externo',
    category: 'Cuidado nos Detalhes',
    caption: 'Atenção às linhas, contornos e áreas de difícil acesso para um visual equilibrado.',
    image: '/src/assets/images/gallery_wheel_detail_1795555903379.jpg',
    imageAlt: 'Detalhe de roda esportiva escura e disco de freio em estúdio',
    span: 'wide',
  },
];

export const INSTITUTIONAL_PILLARS: InstitutionalPillar[] = [
  {
    index: '01',
    title: 'Atenção a cada detalhe',
    description:
      'Cada veículo recebe observação cuidadosa das áreas externas e internas para um resultado harmonioso.',
  },
  {
    index: '02',
    title: 'Técnica e critério visual',
    description:
      'Procedimentos conduzidos com foco na preservação das superfícies, transparência e brilho equilibrado.',
  },
  {
    index: '03',
    title: 'Cuidado completo',
    description:
      'Da leitura dos vidros e faróis ao acabamento da pintura, do motor e dos painéis internos.',
  },
  {
    index: '04',
    title: 'Atendimento direto',
    description:
      'Conversa prática pelo WhatsApp para entender a necessidade do seu carro e alinhar o atendimento.',
  },
];

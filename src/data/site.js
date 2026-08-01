// Language-independent site data: URLs, images, addresses.
// All human-readable text lives in content/*.md.

export const PROJECTS = [
  {
    id: 'ciomnylos',
    url: 'https://youtube.com/@ciomnylos',
    image: '/images/ciomnylos-logo.webp',
    started: 2022,
    lang: 'be',
  },
  {
    id: 'itbeard',
    url: 'https://youtube.com/@itbeard',
    image: '/images/itbeard-300.webp',
    commercial: true,
    started: '2018-04-11',
    lang: 'ru',
  },
  {
    id: 'kalasyai',
    url: 'https://kalasy.ai',
    image: '/images/kalasyai.webp',
    started: 2025,
    lang: 'be',
  },
  {
    id: 'aia',
    url: 'https://podcast.onvibe.io',
    image: '/images/onvibe.webp',
    started: 2025,
    lang: 'ru',
  },
  {
    id: 'evocode',
    url: 'https://evocoders.ai',
    image: '/images/evocode.webp',
    commercial: true,
    started: 2024,
    lang: 'ru',
  },
  {
    id: 'setivir',
    url: 'https://setivir.art',
    image: '/images/setivir.webp',
    started: 2025,
    lang: 'be',
  },
  {
    id: 'vkl',
    url: 'https://vkl.world',
    image: '/images/vkl-logo.webp',
    started: 2022,
    lang: 'be',
  },
  {
    id: 'belarusai',
    url: 'https://telegram.me/belarusai',
    image: '/images/belarusai-logo.webp',
    started: 2023,
    lang: 'be',
  },
]


// dormant projects (no `closed`) are listed first, then closed ones by close year
// `types` — categories for the archive filter; a project may belong to several
export const ARCHIVE_PROJECTS = [
  {
    id: 'uladar',
    image: '/images/uladar-logo.webp',
    started: 2025,
    dormant: true,
    url: 'https://www.youtube.com/@uladarbel',
    lang: 'be',
    types: ['video', 'art'],
  },
  {
    id: 'lex-kartynnik',
    image: '/images/lex-kartynnik-logo.webp',
    started: 2023,
    dormant: true,
    url: 'https://www.youtube.com/channel/UCrdwRUaU3ieEf8UkSTzwT7Q',
    lang: 'en',
    types: ['video'],
  },
  {
    id: 'bloggers-cms',
    image: '/images/bloggers-cms-logo.svg',
    started: 2021,
    dormant: true,
    url: 'https://github.com/it-beard/bloggers-cms',
    types: ['code'],
  },
  {
    id: 'tvoj-ai',
    image: '/images/tvoj-ai-logo.svg',
    started: 2026,
    closed: 2026,
    hideDuration: true,
    url: 'https://competence.school/',
    lang: 'be',
    types: ['education'],
  },
  {
    id: 'autaspynam',
    image: '/images/autaspynam-logo.svg',
    started: 2026,
    closed: 2026,
    hideDuration: true,
    lang: 'be',
    types: ['education'],
  },
  {
    id: 'genai-devhub',
    image: '/images/genai-devhub-logo.webp',
    started: 2025,
    closed: 2026,
    url: 'https://www.skool.com/genai-devhub-5702',
    lang: 'en',
    types: ['community', 'education'],
  },
  {
    id: 'aia-podcast',
    image: '/images/aia-logo.webp',
    started: 2023,
    closed: 2025,
    url: 'https://www.youtube.com/channel/UCxjs3aUQ9OnufZQZaCH-E4w',
    lang: 'ru',
    types: ['podcast', 'video'],
  },
  {
    // community project with a bilingual (en/ru) audience — no language label
    id: 'aia-catalog',
    image: '/images/aia-catalog-logo.webp',
    started: 2024,
    closed: 2025,
    url: 'https://awclub.github.io/catalog/',
    types: ['code', 'community'],
  },
  {
    id: 'letapis',
    image: '/images/vkl-logo.webp',
    started: 2023,
    closed: 2025,
    url: 'https://github.com/it-beard/writefreely-vkl',
    lang: 'be',
    types: ['code', 'community'],
  },
  {
    id: 'nerodina',
    image: '/images/nerodina-logo.webp',
    started: 2023,
    closed: 2025,
    url: 'https://www.youtube.com/playlist?list=PLdmSK1Qzu987ZTif0PGiZEdTSCH5PlBF_',
    lang: 'ru',
    types: ['video'],
  },
  {
    id: 'dunkelsaga',
    image: '/images/dunkelsaga-logo.webp',
    started: 2025,
    closed: 2025,
    url: 'https://www.youtube.com/@dunkelsaga',
    lang: 'de',
    types: ['art'],
  },
  {
    id: 'beard-news',
    image: '/images/beard-news-logo.webp',
    started: 2022,
    closed: 2024,
    lang: 'ru',
    types: ['podcast'],
  },
  {
    id: 'imbalanced-dialogues',
    image: '/images/imbadial-logo.webp',
    started: 2024,
    closed: 2024,
    url: 'https://www.youtube.com/@imbadial',
    lang: 'en',
    types: ['podcast', 'video'],
  },
  {
    id: 'itbeard-shorts',
    image: '/images/itbeard-shorts-logo.webp',
    started: 2022,
    closed: 2023,
    hideDuration: true,
    url: 'https://www.youtube.com/playlist?list=PLhf2AM9rZ9b_DbNadCzxi7zfga9pB_3NK',
    lang: 'ru',
    types: ['video'],
  },
  {
    id: 'darkless',
    image: '/images/logo_tl.webp',
    started: 2021,
    closed: 2022,
    url: 'https://thedarkless.mave.digital/',
    lang: 'ru',
    types: ['podcast', 'video'],
  },
  {
    id: 'visual-studio',
    image: '/images/visual-studio-podcast.webp',
    started: 2019,
    closed: 2019,
    url: 'https://soundcloud.com/visualnaya-studia',
    lang: 'ru',
    types: ['podcast'],
  },
  {
    id: 'it-strana',
    image: '/images/it-strana-logo.webp',
    started: 2017,
    closed: 2019,
    lang: 'ru',
    types: ['community'],
  },
  {
    id: 'genesis',
    image: '/images/genesis_it_academy_logo.webp',
    started: 2018,
    closed: 2019,
    lang: 'ru',
    types: ['education'],
  },
  {
    // international project — no language label
    id: 'pushka',
    image: '/images/pushka-logo.webp',
    started: 2015,
    closed: 2018,
    types: ['education', 'code'],
  },
  {
    id: 'physlib',
    image: '/images/physlib_logo.webp',
    started: 2010,
    closed: 2016,
    lang: 'ru',
    types: ['education', 'community', 'code'],
  },
  {
    id: 'bel-forum',
    image: '/images/bel-forum.webp',
    started: 2008,
    closed: 2010,
    lang: 'ru',
    types: ['community', 'code'],
  },
]

export const CONTACT_LINKS = {
  email: {
    href: 'mailto:iamitbeard@gmail.com',
    text: 'iamitbeard@gmail.com',
    icon: 'fa fa-at',
    color: '#E2434E',
  },
  telegram: {
    href: 'https://telegram.me/iamitbeard',
    text: 'telegram.me/iamitbeard',
    icon: 'fab fa-telegram-plane',
    color: '#2A9DD6',
  },
  whatsapp: {
    href: 'https://wa.me/itbeard',
    text: 'wa.me/itbeard',
    icon: 'fab fa-whatsapp',
    color: '#25D366',
  },
  mastodon: {
    href: 'https://vkl.world/@itbeard',
    text: 'vkl.world/@itbeard',
    icon: 'fab fa-mastodon',
    color: '#8c7dff',
  },
  instagram: {
    href: 'https://instagram.com/iamsetivir',
    text: 'instagram.com/iamsetivir',
    icon: 'fab fa-instagram',
    color: '#E1306C',
  },
  github: {
    href: 'https://github.com/itbeard',
    text: 'github.com/itbeard',
    icon: 'fab fa-github',
    color: '#e8e8e8',
  },
  linkedin: {
    href: 'https://www.linkedin.com/in/akartynnik',
    text: 'linkedin.com/in/akartynnik',
    icon: 'fab fa-linkedin-in',
    color: '#4c9ce8',
  },
  'blog-telegram': {
    href: 'https://telegram.me/itbeard',
    text: 'telegram.me/itbeard',
    icon: 'fab fa-telegram-plane',
    color: '#2A9DD6',
  },
  'ciomnylos-telegram': {
    href: 'https://telegram.me/ciomnylos',
    text: 'telegram.me/ciomnylos',
    icon: 'fab fa-telegram-plane',
    color: '#2A9DD6',
  },
  merch: {
    href: 'https://streamlabs.com/itbeard/merch',
    text: 'streamlabs.com/itbeard/merch',
    icon: 'fa fa-tshirt',
    color: '#E2434E',
  },
}

export const CRYPTO_WALLETS = [
  {
    coin: 'BTC',
    address: 'bc1qvr9areesmfukpphe2es2q339p42yyr7pph73ty',
  },
  {
    coin: 'ETH',
    address: '0xedd9B89632c3d0F774a1204fC8F2B9378dC17beB',
  },
  {
    coin: 'TON',
    address: 'UQC86cyjCPr_GMCMF7egShO835tgntiBGceZwVr9ilFp_14u',
  },
  {
    coin: 'USDT (ERC-20, BEP-20)',
    address: '0xedd9B89632c3d0F774a1204fC8F2B9378dC17beB',
  },
  {
    coin: 'USDT (TRC-20)',
    address: 'TUXAXsM2EEwj6Yu4ragkYDS3riwiSQMEuL',
  },
  {
    coin: 'USDT (TON)',
    address: 'UQC86cyjCPr_GMCMF7egShO835tgntiBGceZwVr9ilFp_14u',
  },
  {
    coin: 'SOL',
    address: '2ZK7hJ8pQ5NXb2ezRtdKWXSAvHLZDMpPKJe5xw5Ak76Y',
  },
  {
    coin: 'DOT',
    address: '13bYtwi73W4Z2rJoyWxdMiaVQrq1S3PkhzzsGrNzfdHcSFoQ',
  },
  {
    coin: 'NEAR',
    address: 'cfe98a5294eb92a6affba80b8265d00c2f09a6a169a8a9da7712ed6e6b951e71',
  },
  {
    coin: 'XTZ',
    address: 'tz1Ppo34Z8TfBSo6bhFZ6qSwTGU3L3FqXJJr',
  },
  {
    coin: 'LTC',
    address: 'ltc1qj8e0jrxc3wx7pfmjfyyjkg8hf2ajs9ecp5wwr2',
  },
  {
    coin: 'DOGE',
    address: 'DFFZkkTsiyEKbGbK2ANACiB35wQU5iJAPk',
  },
]

export const MEDIAKIT_URL =
  'https://docs.google.com/document/d/1IYkdSA9oy5wozg7wVaC673yZ2h8VG0jQVsOkjy9bVe0/edit?tab=t.0'

export const REDIRECTS = {
  mediakit: 'https://itbeard.com/assets/mediakit-itbeard_en.pdf',
  'mediakit-more': 'https://docs.google.com/document/d/1IYkdSA9oy5wozg7wVaC673yZ2h8VG0jQVsOkjy9bVe0',
  'evo-calendar':
    'https://calendar.google.com/calendar/embed?src=144869480c3c1c44b3063bfe8f4a20168383e25a13c351c0b2d35ef2b4eee971%40group.calendar.google.com&ctz=Europe%2FWarsaw',
  'sponsors-discord': 'https://discord.gg/78qkQJjH2b',
}

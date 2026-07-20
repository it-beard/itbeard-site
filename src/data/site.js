// Language-independent site data: URLs, images, addresses.
// All human-readable text lives in content/*.md.

export const PROJECTS = [
  { id: 'evocode', url: 'https://evocoders.ai', image: '/images/evocode.png', commercial: true, started: 2024, lang: 'en' },
  { id: 'itbeard', url: 'https://youtube.com/@itbeard', image: '/images/itbeard-300.jpg', commercial: true, started: 2018, lang: 'ru' },
  { id: 'ciomnylos', url: 'https://youtube.com/@ciomnylos', image: '/images/ciomnylos-logo.jpg', started: 2022, lang: 'be' },
  { id: 'aia', url: 'https://podcast.onvibe.io', image: '/images/onvibe.jpg', started: 2025, lang: 'ru' },
  { id: 'kalasyai', url: 'https://youtube.com/@kalasyai', image: '/images/kalasyai.jpg', started: 2025, lang: 'be' },
  { id: 'setivir', url: 'https://setivir.art', image: '/images/setivir.jpg', started: 2026, lang: 'be' },
  { id: 'vkl', url: 'https://vkl.world', image: '/images/vkl-logo.jpg', started: 2022, lang: 'be' },
  { id: 'belarusai', url: 'https://telegram.me/belarusai', image: '/images/belarusai-logo.jpg', started: 2024, lang: 'be' },
]


// dormant projects (no `closed`) are listed first, then closed ones by close year
export const ARCHIVE_PROJECTS = [
  { id: 'bloggers-cms', image: '/images/bloggers-cms-logo.svg', started: 2021, dormant: true, url: 'https://github.com/it-beard/bloggers-cms' },
  { id: 'lex-kartynnik', image: '/images/lex-kartynnik-logo.jpg', started: 2023, dormant: true, url: 'https://www.youtube.com/channel/UCrdwRUaU3ieEf8UkSTzwT7Q' },
  { id: 'beard-news', image: '/images/beard-news-logo.jpg', started: 2021, closed: 2026 },
  { id: 'letapis', image: '/images/letapis-logo.svg', started: 2023, closed: 2025, url: 'https://github.com/it-beard/writefreely-vkl' },
  { id: 'imbalanced-dialogues', image: '/images/imbadial-logo.jpg', started: 2024, closed: 2024, url: 'https://www.youtube.com/@imbadial' },
  { id: 'pushka', image: '/images/pushka-logo.svg', started: 2015, closed: 2018 },
]

export const CONTACT_LINKS = {
  email: { href: 'mailto:iamitbeard@gmail.com', text: 'iamitbeard@gmail.com', icon: 'fa fa-at', color: '#E2434E' },
  telegram: { href: 'https://telegram.me/iamitbeard', text: 'telegram.me/iamitbeard', icon: 'fab fa-telegram-plane', color: '#2A9DD6' },
  mastodon: { href: 'https://vkl.world/@itbeard', text: 'vkl.world/@itbeard', icon: 'fab fa-mastodon', color: '#8c7dff' },
  twitter: { href: 'https://x.com/iamitbeard', text: 'x.com/iamitbeard', icon: 'fab fa-twitter', color: '#1A8CD8' },
  github: { href: 'https://github.com/itbeard', text: 'github.com/itbeard', icon: 'fab fa-github', color: '#e8e8e8' },
  linkedin: { href: 'https://www.linkedin.com/in/akartynnik', text: 'linkedin.com/in/akartynnik', icon: 'fab fa-linkedin-in', color: '#4c9ce8' },
  'blog-telegram': { href: 'https://telegram.me/itbeard', text: 'telegram.me/itbeard', icon: 'fab fa-telegram-plane', color: '#2A9DD6' },
  merch: { href: 'https://streamlabs.com/itbeard/merch', text: 'streamlabs.com/itbeard/merch', icon: 'fa fa-tshirt', color: '#E2434E' },
}

export const CRYPTO_WALLETS = [
  { coin: 'BTC', address: 'bc1qvr9areesmfukpphe2es2q339p42yyr7pph73ty' },
  { coin: 'ETH', address: '0xedd9B89632c3d0F774a1204fC8F2B9378dC17beB' },
  { coin: 'TON', address: 'UQC86cyjCPr_GMCMF7egShO835tgntiBGceZwVr9ilFp_14u' },
  { coin: 'USDT (ERC-20, BEP-20)', address: '0xedd9B89632c3d0F774a1204fC8F2B9378dC17beB' },
  { coin: 'USDT (TRC-20)', address: 'TUXAXsM2EEwj6Yu4ragkYDS3riwiSQMEuL' },
  { coin: 'USDT (TON)', address: 'UQC86cyjCPr_GMCMF7egShO835tgntiBGceZwVr9ilFp_14u' },
  { coin: 'SOL', address: '2ZK7hJ8pQ5NXb2ezRtdKWXSAvHLZDMpPKJe5xw5Ak76Y' },
  { coin: 'DOT', address: '13bYtwi73W4Z2rJoyWxdMiaVQrq1S3PkhzzsGrNzfdHcSFoQ' },
  { coin: 'NEAR', address: 'cfe98a5294eb92a6affba80b8265d00c2f09a6a169a8a9da7712ed6e6b951e71' },
  { coin: 'XTZ', address: 'tz1Ppo34Z8TfBSo6bhFZ6qSwTGU3L3FqXJJr' },
  { coin: 'LTC', address: 'ltc1qj8e0jrxc3wx7pfmjfyyjkg8hf2ajs9ecp5wwr2' },
  { coin: 'DOGE', address: 'DFFZkkTsiyEKbGbK2ANACiB35wQU5iJAPk' },
]

export const REDIRECTS = {
  mediakit: 'https://itbeard.com/assets/mediakit-itbeard_en.pdf',
  'mediakit-more': 'https://docs.google.com/document/d/1IYkdSA9oy5wozg7wVaC673yZ2h8VG0jQVsOkjy9bVe0',
  'evo-calendar':
    'https://calendar.google.com/calendar/embed?src=144869480c3c1c44b3063bfe8f4a20168383e25a13c351c0b2d35ef2b4eee971%40group.calendar.google.com&ctz=Europe%2FWarsaw',
  'sponsors-discord': 'https://discord.gg/78qkQJjH2b',
}

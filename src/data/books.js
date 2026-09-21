// Data for the unlisted /books page: the wanted list and the home library.
// Everything here is language-independent; the texts live in content/books.md.

// Wanted list — the carousel at the top of the unlisted /books page: editions being hunted for.
// Titles and series are kept exactly as printed on the cover; people and
// publishers (which need transliteration) and the notes live in content/books.md.
// `url` points at a write-up of the edition.
export const WANTED = [
  {
    id: 'narnia-magicians-nephew',
    series: 'Хронікі Нарніі',
    part: 1,
    title: 'Пляменнік чараўніка',
    year: 2016,
    isbn: '978-985-6983-76-7',
    url: 'https://budzma.org/news/khroniki-narnii-pa-byelarusku-prezyentacyya-11-lyutaha.html',
  },
  {
    id: 'lotr-two-towers',
    series: 'Уладар Пярсьцёнкаў',
    part: 2,
    title: 'Дзьве вежы',
    year: 2008,
    printRun: 500,
    url: 'https://nashaniva.com/21412',
  },
  {
    id: 'lotr-return-of-the-king',
    series: 'Уладар Пярсьцёнкаў',
    part: 3,
    title: 'Вяртаньне караля',
    year: 2009,
    printRun: 500,
    url: 'https://knihi.com/Dzon_Ronald_Ruel_Tolkin/Uladar_piarscionkau_3_Viartannie_karala.html',
  },
].map((b) => ({ ...b, image: `/images/books/${b.id}.webp` }))

// Home library. The source keeps the books grouped the way they stand at home;
// the page shows them in `byShelfOrder` (see below).
// Authors and titles are kept exactly as printed on the spine, in the book's own language.
//   lang  — language of the edition: be / ru / en / pl
//   tags  — categories for the filter chips (see `filters` in content/books.md)
//   spine — spine colour, ink — lettering colour, both picked from the real book
//   size  — spine thickness: 1 thin, 2 regular, 3 thick
// The note for each book lives in content/library.md under the same id; the
// facts for its card (year, publisher, translator…) are in LIBRARY_FACTS below.
// Facts for the book cards, by id: what the edition itself states (year, publisher,
// city, translator, isbn, pages), and `cover: true` when public/images/library/<id>.webp exists.
const LIBRARY_FACTS = {
  'sciezkami-mifau': { year: 2023, publisher: 'самвыдат', pages: 42, cover: true },
  'niaklajeu-kniha-losau': { year: 2025, publisher: 'KEW', city: 'Вроцлаў', isbn: '978-83-7893-351-9', cover: true },
  'mify-backauscyny': { year: 1994, publisher: 'Беларуская Энцыклапедыя', city: 'Мінск', isbn: '5-85700-162-5', cover: true },
  'kazakova-mifalahiemy-i-mahija': { year: 1997, publisher: 'БОФФ', city: 'Мінск', isbn: '985-430-003-X', pages: 119, cover: true },
  'padlasskaje-na-uik-end': { publisher: 'Маршалкоўская Управа Падляшскага ваяводства', city: 'Беласток', translator: 'Міраслава Лукша', isbn: '978-83-962873-5-9', cover: true },
  'arlou-imiony-svabody-1': { year: 2026, publisher: 'Uladzimir Arlou', city: 'Беласток', isbn: '978-83-980428-1-9', cover: true },
  'ruska-bielaruski-slounik-1953': { year: 1953, publisher: 'Дзяржаўнае выдавецтва замежных і нацыянальных слоўнікаў', city: 'Масква', cover: true },
  'tradycyjny-svietapohlad-1': { cover: true },
  'buraukin-nahavarycca-z-zorkami': { year: 2026, publisher: 'Мон літара', city: 'Мінск', cover: true },
  'pirs-ja-vychodzu': { year: 2021, publisher: 'Pearce', city: 'Варшава', cover: true },
  'reynolds-house-of-suns': { year: 2022, publisher: 'Азбука', city: 'Санкт-Петербург', translator: 'Алла Ахмерова, Кирилл Плешков', isbn: '978-5-389-20484-3', pages: 576, cover: true },
  'snegov-men-like-gods': { year: 2023, publisher: 'Азбука', city: 'Санкт-Петербург', isbn: '978-5-389-22045-4', pages: 672, cover: true },
  'liu-three-body': { year: 2017, publisher: 'fanzon', city: 'Москва', translator: 'Ольга Глушкова', isbn: '978-5-04-089112-2', pages: 464, cover: true },
  'liu-dark-forest': { year: 2018, publisher: 'fanzon', city: 'Москва', translator: 'Дмитрий Накамура', isbn: '978-5-04-090294-1', pages: 640, cover: true },
  'liu-deaths-end': { year: 2018, publisher: 'fanzon', city: 'Москва', translator: 'Ольга Глушкова, Дмитрий Накамура', isbn: '978-5-04-091564-4', pages: 688, cover: true },
  'kaku-future-of-humanity': { year: 2019, publisher: 'Альпина нон-фикшн', city: 'Москва', translator: 'Наталья Лисова', isbn: '978-5-00139-053-4', pages: 464, cover: true },
  'latyshkevich-vek-ludzej': { year: 2025, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-6164-9', pages: 924, cover: true },
  'bychkouski-dzieci-silmaryliona': { year: 2022, publisher: 'Галіяфы', city: 'Мінск', isbn: '978-985-7209-91-0', pages: 214, cover: true },
  'shukanau-pentakvantar-1': { year: 2025, publisher: 'Gutenberg Publisher', city: 'Кракаў', isbn: '978-83-68016-62-8', pages: 352, cover: true },
  'shukanau-pentakvantar-2': { year: 2025, publisher: 'Gutenberg Publisher', city: 'Кракаў', isbn: '978-83-68016-62-8', pages: 288, cover: true },
  'noradrenalin-poudzien': { year: 2026, publisher: 'Gutenberg Publisher', city: 'Кракаў', isbn: '978-83-68016-71-0', pages: 402, cover: true },
  'shapran-bykau-pra-mastactva': { year: 2026, isbn: '978-985-7278-54-1', cover: true },
  'buraukin-prazhytaje-napisanaje': { year: 2026 },
  'hlinistaja-kalychanka-dla-minska': { year: 2026, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-6312-4', pages: 240, cover: true },
  'nia-czysty-minsk': { year: 2025, publisher: 'Папуры', city: 'Мінск', translator: 'Ірына Зінкевіч, Паліна Грыб, Яна Уладыка, Наталля Давыдоўская', isbn: '978-985-15-5955-4', pages: 304, cover: true },
  'tolkien-uladar-1-2008': { year: 2008, city: 'Менск', translator: 'Дзьмітры Магілеўцаў, Крысьціна Курчанкова', pages: 418, cover: true },
  'buraukin-moj-bol-i-zapaviet': { year: 2021, publisher: 'Звязда', city: 'Мінск', isbn: '978-985-575-287-6', pages: 144, cover: true },
  'karatkievich-dzikaje-palavannie-pocket': { year: 2025, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5788-8', pages: 304, cover: true },
  'tolkien-valadar-1': { year: 2023, publisher: 'Янушкевіч', city: 'Варшава', translator: 'Ігар Кулікоў', isbn: '978-83-969297-6-1', pages: 562, cover: true },
  'tolkien-valadar-2': { year: 2024, publisher: 'Янушкевіч', city: 'Варшава', translator: 'Ігар Кулікоў', isbn: '978-83-68202-07-6', pages: 494, cover: true },
  'tolkien-valadar-3': { year: 2024, publisher: 'Янушкевіч', city: 'Варшава', translator: 'Ігар Кулікоў', isbn: '978-83-68202-19-9', pages: 596, cover: true },
  'herbert-dziuna': { year: 2025, publisher: 'Янушкевіч', city: 'Варшава', translator: 'Ігар Кулікоў', isbn: '978-83-68202-33-5', pages: 750, cover: true },
  'weir-marsijanin': { year: 2024, publisher: 'Gutenberg Publisher', city: 'Кракаў', translator: 'Тодар Сом', isbn: '978-83-68016-18-5', pages: 490, cover: true },
  'saint-exupery-malenki-prync': { publisher: 'Папуры', city: 'Мінск', translator: 'Ніна Мацяш', cover: true },
  'mccarthy-daroha': { year: 2022, publisher: 'Янушкевіч', city: 'Мінск', translator: 'Серж Мядзведзеў', isbn: '978-985-7283-20-0', pages: 256, cover: true },
  'lewis-leu-viadzmarka-harderob': { year: 2018, publisher: 'Пазітыў-цэнтр', city: 'Мінск', translator: 'Андрэй Кім', isbn: '978-985-7193-04-2', pages: 180, cover: true },
  'lewis-prync-kaspijan': { year: 2022, publisher: 'Пазітыў-цэнтр', translator: 'Андрэй Строцаў', isbn: '978-985-7193-83-7', pages: 216, cover: true },
  'lewis-kon-i-jaho-chlopczyk': { year: 2023, publisher: 'Капітал-Прынт', translator: 'Яна Владыка', isbn: '978-985-7161-80-5', pages: 224, cover: true },
  'rowling-hary-poter-1': { year: 2025, publisher: 'Янушкевіч', translator: 'Алена Пятровіч', isbn: '978-83-68202-22-9', pages: 328, cover: true },
  'rowling-hary-poter-2': { year: 2025, publisher: 'Янушкевіч', translator: 'Алена Пятровіч', isbn: '978-83-68202-23-6', pages: 356, cover: true },
  'rowling-hary-poter-3': { year: 2025, publisher: 'Янушкевіч', translator: 'Алена Пятровіч', isbn: '978-83-68202-24-3', pages: 448, cover: true },
  'rowling-hary-poter-4': { year: 2025, publisher: 'Янушкевіч', translator: 'Алена Пятровіч', isbn: '978-83-68202-25-0', pages: 712, cover: true },
  'bradbury-marsijanskija-chroniki': { year: 2025, publisher: 'Янушкевіч', isbn: '978-83-68202-28-1', pages: 312, cover: true },
  'adams-autaspynam-pa-halaktycy': { year: 2015, publisher: 'Логвінаў', city: 'Вільня', translator: 'Павал Касцюкевіч', isbn: '978-609-8147-06-3', pages: 224, cover: true },
  'homer-ilijada': { year: 2024, publisher: 'Полацкія лабірынты', translator: 'Лявон Баршчэўскі', isbn: '978-83-965621-6-6', pages: 472, cover: true },
  'homer-adysieja': { year: 2026, publisher: 'Полацкія лабірынты', translator: 'Лявон Баршчэўскі', isbn: '978-83-982922-0-7', pages: 392, cover: true },
  'vergil-eneida': { year: 2025, publisher: 'Полацкія лабірынты', translator: 'Лявон Баршчэўскі', isbn: '978-83-68460-01-8', pages: 364, cover: true },
  'sapkowski-1-aposniaje-zadannie': { year: 2024, publisher: 'Янушкевіч', translator: 'Кацярына Маціеўская', isbn: '978-83-68202-08-3', pages: 342, cover: true },
  'sapkowski-2-miec-nakanavannia': { year: 2024, publisher: 'Янушкевіч', translator: 'Кацярына Маціеўская', isbn: '978-83-68202-09-0', pages: 412, cover: true },
  'sapkowski-3-krou-elfau': { year: 2024, publisher: 'Янушкевіч', translator: 'Кацярына Маціеўская', isbn: '978-83-68202-10-6', pages: 364, cover: true },
  'sapkowski-4-cas-pahardy': { year: 2024, publisher: 'Янушкевіч', translator: 'Кацярына Маціеўская', isbn: '978-83-970292-3-1', pages: 392, cover: true },
  'sapkowski-5-chryscennie-ahniom': { year: 2025, publisher: 'Янушкевіч', translator: 'Кацярына Маціеўская', isbn: '978-83-68202-39-7', pages: 420, cover: true },
  'grzedowicz-haspadar-1': { year: 2024, publisher: 'Янушкевіч', translator: 'Марыя Пушкіна, Алена Пятровіч', isbn: '978-83-68202-13-7', pages: 462, cover: true },
  'grzedowicz-haspadar-2': { year: 2024, publisher: 'Янушкевіч', translator: 'Марыя Пушкіна, Алена Пятровіч', isbn: '978-83-68202-14-4', pages: 532, cover: true },
  'grzedowicz-haspadar-3': { year: 2024, publisher: 'Янушкевіч', translator: 'Марыя Пушкіна, Алена Пятровіч', isbn: '978-83-68202-15-1', pages: 424, cover: true },
  'lem-zornyja-dzionniki': { year: 2024, publisher: 'Янушкевіч', translator: 'Марыя Пушкіна', isbn: '978-83-68202-11-3', pages: 386, cover: true },
  'biblija-dore': { publisher: 'АСТ', city: 'Москва', translator: 'Синодальный перевод', isbn: '978-5-17-138165-3', pages: 1200, cover: true },
  'goldratt-cel': { publisher: 'Попурри', city: 'Минск', translator: 'Елена Федурко', pages: 400, cover: true },
  'mitnick-prizrak-v-seti': { year: 2012, publisher: 'Эксмо', city: 'Москва', isbn: '978-5-699-58256-3', pages: 416, cover: true },
  'petzold-kod': { year: 2019, publisher: 'Манн, Иванов и Фербер', city: 'Москва', translator: 'Олег Сивченко', isbn: '978-5-00117-545-2', pages: 448, cover: true },
  'ferreira-filho-computer-science': { year: 2018, publisher: 'Питер', city: 'Санкт-Петербург', translator: 'А. В. Логунов', isbn: '978-5-4461-0587-8', pages: 224, cover: true },
  'hawking-kratchajshaja-istorija-vremeni': { year: 2017, publisher: 'АСТ', city: 'Москва', translator: 'А. Дамбис', isbn: '978-5-17-102280-8', pages: 176, cover: true },
  'arlou-belarus-illustrated-history': { year: 2023, publisher: 'Gutenberg Publisher', city: 'Kraków', translator: 'Jim Dingley', isbn: '978-83-967644-2-3', pages: 224, cover: true },
  'harady-bielarusi-na-pastoukach': { publisher: 'Беларусь', city: 'Мінск', cover: true },
  'basak-forest-bogeyfolk': { year: 2024, publisher: 'Skaryna Press', city: 'Warsaw', translator: 'Andrej Strocaŭ', isbn: '978-83-971664-1-7', pages: 65, cover: true },
  'thengvall-business-value-devrel': { year: 2018, publisher: 'Apress', isbn: '9781484237472', pages: 264, cover: true },
  'martin-clean-architecture': { year: 2017, publisher: 'Pearson', isbn: '9780134494166', pages: 432, cover: true },
  'alammar-hands-on-llm': { year: 2024, publisher: "O'Reilly Media", city: 'Sebastopol, CA', isbn: '9781098150969', pages: 425, cover: true },
  'lewko-developer-relations': { year: 2021, publisher: 'Apress', isbn: '9781484271636', pages: 190, cover: true },
  'amidi-super-study-guide-llm': { year: 2024, publisher: 'Independently published', isbn: '9798836693312', pages: 247, cover: true },
  'slashdata-developer-marketing': { year: 2019, publisher: 'SlashData', isbn: '9781690712282', pages: 296, cover: true },
  'galczynski-vulica-sarlatanau': { year: 2026, publisher: 'Gutenberg Publisher', city: 'Кракаў', translator: 'Андрэй Хадановіч', pages: 464, cover: true },
  'rowling-chamber-of-secrets-en': { year: 2014, publisher: 'Bloomsbury', city: 'London', isbn: '9781408855669', pages: 384, cover: true },
  'acemoglu-why-nations-fail': { year: 2013, publisher: 'Profile Books', city: 'London', isbn: '9781846684302', pages: 560, cover: true },
  'orwell-1984': { year: 2020, publisher: 'Янушкевіч', city: 'Мінск', translator: 'Сяргей Шупа', isbn: '978-985-7210-56-5', pages: 338, cover: true },
  'orwell-fierma-zyviolau': { year: 2022, publisher: 'Вясна', city: 'Прага', translator: 'Сяргей Шупа', isbn: '978-80-908687-0-0', pages: 120, cover: true },
  'basak-niacysciki-vodnyja': { year: 2024, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5591-4', pages: 124, cover: true },
  'basak-niacysciki-liasnyja': { year: 2024, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5590-7', pages: 64, cover: true },
  'zycciadajnyja-krynicy': { year: 2002, publisher: 'Юнацтва', city: 'Мінск', isbn: '985-05-0432-3', pages: 159, cover: true },
  'patajemnaja-spadcyna-1': { year: 2025, publisher: 'ByProsvet', city: 'Варшава', isbn: '978-83-974131-5-3', pages: 120, cover: true },
  'patajemnaja-spadcyna-2': { year: 2025, publisher: 'ByProsvet', city: 'Варшава', isbn: '978-83-974131-6-0', pages: 80, cover: true },
  'mysl-bialoruska-xx-wieku': { year: 1998, publisher: 'Slawistyczny Ośrodek Wydawniczy (Instytut Slawistyki PAN)', city: 'Warszawa', isbn: '83-86619-62-7', pages: 741, cover: true },
  'biel-cyrvona-biely': { year: 2024, publisher: 'Янушкевіч', city: 'Варшава', isbn: '978-83-970292-6-2', pages: 308, cover: true },
  'irdorath-bestiarium': { year: 2026, publisher: 'Irdorath (самвыдат гурта)', cover: true },
  'barsceuski-sliachcic-zavalnia': { year: 2024, publisher: 'Папуры', city: 'Мінск', translator: 'Мікола Хаўстовіч', isbn: '978-985-15-5592-1', pages: 360, cover: true },
  'carnucha-hvalt': { year: 2024, publisher: 'Янушкевіч', isbn: '978-83-68202-26-7', pages: 186, cover: true },
  'arkus-jak-padaje-snieh': { year: 2024, publisher: 'Фонд Kamunikat.org', city: 'Беласток', isbn: '978-83-67937-30-6', pages: 172, cover: true },
  'horvat-radziva-prudok': { year: 2017, publisher: 'Медысонт', city: 'Мінск', isbn: '978-985-7136-89-6', pages: 248, cover: true },
  'ryzkou-dzviery-zamknionyja-na-klucy': { year: 2025, publisher: 'Экапрэс' },
  'hapiejeva-v-jadomyja-historyi': { year: 2017, publisher: 'Логвінаў', city: 'Вільня', isbn: '978-609-8147-76-6', pages: 76, cover: true },
  'corny-posuki-buducyni': { year: 2023, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5527-3', pages: 256, cover: true },
  'kupala-tutejsyja': { year: 2015, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-2421-7', pages: 272, cover: true },
  'karatkievich-ladzdzia-rospacy': { year: 2024, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5586-0', pages: 64, cover: true },
  'bielavieskin-sto-jesci': { year: 2024, publisher: 'Independently published (Amazon KDP)', isbn: '979-8-3206-8689-9', pages: 274, cover: true },
  'bielavieskin-volia-da-zyccia': { year: 2024, publisher: 'Independently published (Amazon KDP)', isbn: '979-8-3224-9372-3', pages: 453, cover: true },
  'vkl-encyklapiedyja-1': { year: 2005, publisher: 'Беларуская Энцыклапедыя імя Петруся Броўкі', city: 'Мінск', isbn: '985-11-0314-4', pages: 688, cover: true },
  'vkl-encyklapiedyja-2': { year: 2006, publisher: 'Беларуская Энцыклапедыя імя Петруся Броўкі', city: 'Мінск', isbn: '985-11-0378-0', pages: 792, cover: true },
  'hulecki-100-manet-vkl': { year: 2020, publisher: 'Тэхналогія', city: 'Мінск', pages: 80, cover: true },
  'hraviury-skaryny': { publisher: 'Беларусь', city: 'Мінск' },
  'aleksandrovic-kartahrafija-vkl': { year: 2021, publisher: 'Тэхналогія', city: 'Мінск', translator: 'Максім Макараў', pages: 304, cover: true },
  'adamovic-jan-niaprecki': { year: 2022, isbn: '978-609-492-005-9', pages: 155, cover: true },
  'karatkievich-dzikaje-palavannie': { year: 2025, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5957-8', pages: 272, cover: true },
  'karatkievich-kalasy-white': { publisher: 'Папуры', city: 'Мінск', cover: true },
  'karatkievich-kalasy-yellow': { year: 2023, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5511-2', pages: 928, cover: true },
  'bykau-znak-biady': { year: 2022, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5056-8', pages: 320, cover: true },
  'mielez-ludzi-na-balocie': { year: 2026, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-6396-4', pages: 400, cover: true },
  'kolas-na-rostaniach': { year: 2026, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-6395-7', pages: 688, cover: true },
  'bacharevic-sabaki-europy': { year: 2024, publisher: 'Янушкевіч', isbn: '978-83-970292-8-6', pages: 676, cover: true },
  'kupala-vybranaje': { year: 2022, publisher: 'Папуры', city: 'Мінск', isbn: '978-985-15-5065-0', pages: 288, cover: true },
  'sieviaryniec-hascinica-bielhija': { year: 2025, publisher: 'Czabor Publishing', city: 'Варшава', isbn: '978-83-971664-6-2', pages: 712, cover: true },
  'arlou-kraina-bielarus': { year: 2013, publisher: 'Kalligram', city: 'Браціслава', isbn: '978-80-8101-603-5', pages: 320, cover: true },
  'danilovic-slova-i-frazealahizm': { year: 2015, publisher: 'ЮрСаПрынт', city: 'Гродна', isbn: '978-985-7128-04-8', pages: 300, cover: true },
  'cyrvinski-bielarus-u-vojnach': { year: 2019, publisher: 'Харвест', city: 'Мінск', isbn: '978-985-18-4543-5', pages: 447, cover: true },
  'starabielaruskaja-litaratura': { year: 2004, publisher: 'Універсітэт у Беластоку', city: 'Беласток', isbn: '83-89031-81-7', pages: 772, cover: true },
  'michaluk-bnr-1918-1920': { year: 2015, publisher: 'Інбелкульт', city: 'Смаленск', translator: 'Алесь Пілецкі', isbn: '978-5-00076-016-1', pages: 496, cover: true },
  'piesnia-piesniau': { year: 2022, publisher: 'Вясна', city: 'Прага', translator: 'Сяргей Шупа', isbn: '978-80-908687-1-7', pages: 144, cover: true },
  'raslinny-sviet-slounik': { year: 2001, publisher: 'Беларуская навука', city: 'Мінск', isbn: '985-08-0457-2', pages: 655, cover: true },
  'savicki-slounik-pa-infarmatycy': { year: 2014, publisher: 'Медыял', city: 'Менск', isbn: '978-985-6914-20-4', pages: 418, cover: true },
  'arendt-pra-calaviecnasc': { year: 2026, publisher: 'Пфляўмбаўм', city: 'Вільня', translator: 'Алена Пятровіч, Вольга Гронская, Алена Талапіла, Кацярына Тэвес', isbn: '978-609-8350-16-6', pages: 287, cover: true },
  'leksicny-atlas-5': { year: 1998, publisher: 'Камітэт дзяржаўных знакаў пры Міністэрстве фінансаў Рэспублікі Беларусь', city: 'Мінск', cover: true },
}

// Bilingual and trilingual editions: the languages a book carries besides its main one.
// The main language (`lang`) decides where the book stands; these only get marked and filtered.
const ALSO_IN = {
  'mysl-bialoruska-xx-wieku': ['pl'],
  'galczynski-vulica-sarlatanau': ['pl'],
  'harady-bielarusi-na-pastoukach': ['en'],
  'tradycyjny-svietapohlad-1': ['ru', 'en'],
}

const book = (id, author, title, lang, tags, spine, ink, size = 2) => ({
  id,
  author,
  title,
  lang,
  tags: [].concat(tags),
  spine,
  ink,
  size,
})

// Volumes of one series share one colour, so a series reads as a block on the shelf.
const SERIES = {
  'В память о прошлом Земли': ['#10294d', '#ffffff'],
  Пентаквантар: ['#c2457f', '#ffffff'],
  'Валадар Пярсцёнкаў': ['#15161a', '#d9b45a'],
  'Хронікі Нарніі': ['#6b6680', '#ffffff'],
  'Гары Потэр': ['#1b1b1f', '#e3c25a'],
  Вядзьмар: ['#2c3033', '#e8e8e8'],
  'Гаспадар Ледзянога саду': ['#4a4338', '#f1ead6'],
  'Беларускія нячысцікі': ['#121212', '#e2b93b'],
  'Патаемная спадчына': ['#3a2f7a', '#e7c25a'],
  'Вялікае Княства Літоўскае. Энцыклапедыя': ['#cfc4b6', '#5a2f2f'],
}

const volume = (id, author, title, lang, tags, series, part, size = 2) => ({
  ...book(id, author, title, lang, tags, ...SERIES[series], size),
  series,
  part,
})

const BOOKS = [
  // science fiction in Russian
  book('reynolds-house-of-suns', 'Аластер Рейнольдс', 'Дом солнц', 'ru', 'sf', '#cdbfb3', '#4a3c38', 3),
  book('snegov-men-like-gods', 'Сергей Снегов', 'Люди как боги', 'ru', 'sf', '#2b2f8f', '#f1d9a0', 3),
  volume('liu-three-body', 'Лю Цысинь', 'Задача трёх тел', 'ru', 'sf', 'В память о прошлом Земли', 1, 3),
  volume('liu-dark-forest', 'Лю Цысинь', 'Тёмный лес', 'ru', 'sf', 'В память о прошлом Земли', 2, 3),
  volume('liu-deaths-end', 'Лю Цысинь', 'Вечная жизнь Смерти', 'ru', 'sf', 'В память о прошлом Земли', 3, 3),
  book('kaku-future-of-humanity', 'Митио Каку', 'Будущее человечества', 'ru', 'nonfic', '#f1f1f4', '#31408f', 3),

  // new Belarusian prose and fantasy
  book('latyshkevich-vek-ludzej', 'Маргарыта Латышкевіч', 'Век людзей', 'be', 'sf', '#1d1f26', '#d9a441', 3),
  book('bychkouski-dzieci-silmaryliona', 'Алесь Бычкоўскі', 'Дзеці Сільмарыліёна', 'be', 'fiction', '#1f2340', '#ffffff'),
  volume('shukanau-pentakvantar-1', 'Арцём Шуканаў', 'Пентаквантар. Кніга 1', 'be', 'sf', 'Пентаквантар', 1),
  volume('shukanau-pentakvantar-2', 'Арцём Шуканаў', 'Пентаквантар. Кніга 2', 'be', 'sf', 'Пентаквантар', 2),
  book('noradrenalin-poudzien', 'Яўген Анашкін', 'Норадрэналін. Поўдзень', 'be', 'fiction', '#25262b', '#ffffff', 3),
  book('shapran-bykau-pra-mastactva', 'Сяргей Шапран', 'Васіль Быкаў. [Пра] мастацтва', 'be', 'nonfic', '#f7f7f5', '#333333', 3),
  book('buraukin-prazhytaje-napisanaje', 'Генадзь Бураўкін', 'Пражытае-напісанае', 'be', 'nonfic', '#2f86bd', '#ffffff', 3),
  book('hlinistaja-kalychanka-dla-minska', 'Кацярына Гліністая', 'Калыханка для Мінска', 'be', 'sf', '#2b2d52', '#f0c987'),
  book('nia-czysty-minsk', '«Шуфлядка пісьменніка»', '(Ня)чысты Мінск', 'be', 'sf', '#1c2a44', '#e9d9a6'),
  book('tolkien-uladar-1-2008', 'Дж. Р. Р. Толкін', 'Уладар Пярсьцёнкаў. 1. Зьвяз Пярсьцёнка', 'be', 'sf', '#f3efe6', '#a3281f'),
  book('buraukin-moj-bol-i-zapaviet', 'Генадзь Бураўкін', 'Мой боль і запавет', 'be', 'poetry', '#8a8a8a', '#1d1d1d'),
  book('karatkievich-dzikaje-palavannie-pocket', 'Уладзімір Караткевіч', 'Дзікае паляванне караля Стаха', 'be', 'fiction', '#15181a', '#ffffff', 1),

  // Tolkien in Ihar Kulikou's translation, and Dune
  volume('tolkien-valadar-1', 'Дж. Р. Р. Толкін', 'Брацтва Пярсцёнка', 'be', 'sf', 'Валадар Пярсцёнкаў', 1, 3),
  volume('tolkien-valadar-2', 'Дж. Р. Р. Толкін', 'Дзве вежы', 'be', 'sf', 'Валадар Пярсцёнкаў', 2, 3),
  volume('tolkien-valadar-3', 'Дж. Р. Р. Толкін', 'Вяртанне караля', 'be', 'sf', 'Валадар Пярсцёнкаў', 3, 3),
  book('herbert-dziuna', 'Фрэнк Герберт', 'Дзюна', 'be', 'sf', '#1f2433', '#e7d3a8', 3),

  // world fiction in Belarusian
  book('weir-marsijanin', 'Эндзі Ўір', 'Марсіянін', 'be', 'sf', '#c4623a', '#ffffff', 3),
  book('saint-exupery-malenki-prync', 'Антуан дэ Сент-Экзюперы', 'Маленькі прынц', 'be', 'fiction', '#1d78a6', '#ffffff', 1),
  book('mccarthy-daroha', 'Кормак Макарці', 'Дарога', 'be', 'fiction', '#141414', '#e0a23a'),
  volume('lewis-leu-viadzmarka-harderob', 'К. С. Льюіс', 'Леў, вядзьмарка і гардэроб', 'be', 'sf', 'Хронікі Нарніі', 2),
  volume('lewis-prync-kaspijan', 'К. С. Льюіс', 'Прынц Каспіян', 'be', 'sf', 'Хронікі Нарніі', 4),
  volume('lewis-kon-i-jaho-chlopczyk', 'К. С. Льюіс', 'Конь і яго хлопчык', 'be', 'sf', 'Хронікі Нарніі', 3),
  volume('rowling-hary-poter-1', 'Дж. К. Роўлінг', 'Гары Потэр і філасофскі камень', 'be', 'sf', 'Гары Потэр', 1),
  volume('rowling-hary-poter-2', 'Дж. К. Роўлінг', 'Гары Потэр і Таемная зала', 'be', 'sf', 'Гары Потэр', 2),
  volume('rowling-hary-poter-3', 'Дж. К. Роўлінг', 'Гары Потэр і вязень Азкабана', 'be', 'sf', 'Гары Потэр', 3),
  volume('rowling-hary-poter-4', 'Дж. К. Роўлінг', 'Гары Потэр і Келіх агню', 'be', 'sf', 'Гары Потэр', 4, 3),
  book('bradbury-marsijanskija-chroniki', 'Рэй Брэдберы', 'Марсіянскія хронікі', 'be', 'sf', '#ef5d7a', '#2a1a1f'),
  book('adams-autaspynam-pa-halaktycy', 'Дуглас Адамс', 'Аўтаспынам па Галактыцы', 'be', 'sf', '#17171a', '#f0a028'),

  // epics and sagas
  book('homer-ilijada', 'Гамер', 'Іліяда', 'be', 'poetry', '#111111', '#f0a13a', 3),
  book('homer-adysieja', 'Гамер', 'Адысея', 'be', 'poetry', '#111111', '#3aa0f0', 3),
  book('vergil-eneida', 'Вергілій', 'Энэіда', 'be', 'poetry', '#111111', '#e8433a', 3),
  volume('sapkowski-1-aposniaje-zadannie', 'Анджэй Сапкоўскі', 'Апошняе жаданне', 'be', 'sf', 'Вядзьмар', 1),
  volume('sapkowski-2-miec-nakanavannia', 'Анджэй Сапкоўскі', 'Меч наканавання', 'be', 'sf', 'Вядзьмар', 2),
  volume('sapkowski-3-krou-elfau', 'Анджэй Сапкоўскі', 'Кроў эльфаў', 'be', 'sf', 'Вядзьмар', 3),
  volume('sapkowski-4-cas-pahardy', 'Анджэй Сапкоўскі', 'Час ганьбы', 'be', 'sf', 'Вядзьмар', 4),
  volume('sapkowski-5-chryscennie-ahniom', 'Анджэй Сапкоўскі', 'Хрышчэнне агнём', 'be', 'sf', 'Вядзьмар', 5),
  volume('grzedowicz-haspadar-1', 'Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том I', 'be', 'sf', 'Гаспадар Ледзянога саду', 1, 3),
  volume('grzedowicz-haspadar-2', 'Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том II', 'be', 'sf', 'Гаспадар Ледзянога саду', 2, 3),
  volume('grzedowicz-haspadar-3', 'Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том III', 'be', 'sf', 'Гаспадар Ледзянога саду', 3, 3),
  book('lem-zornyja-dzionniki', 'Станіслаў Лем', 'Зорныя дзённікі', 'be', 'sf', '#1f2a38', '#7fb6e8'),

  // Russian-language shelf
  book('biblija-dore', '', 'Библия. С иллюстрациями Гюстава Доре', 'ru', 'nonfic', '#3a2618', '#d9b15a', 3),
  book('goldratt-cel', 'Элияху Голдратт, Джефф Кокс', 'Цель. Процесс непрерывного улучшения', 'ru', 'tech', '#161616', '#ffffff'),
  book('mitnick-prizrak-v-seti', 'Кевин Митник, Уильям Саймон', 'Призрак в сети. Мемуары величайшего хакера', 'ru', 'tech', '#1c4fb0', '#ffffff'),
  book('petzold-kod', 'Чарльз Петцольд', 'Код', 'ru', 'tech', '#f6f6f4', '#8a6a22'),
  book('ferreira-filho-computer-science', 'Владстон Феррейра Фило', 'Теоретический минимум по Computer Science', 'ru', 'tech', '#44902a', '#ffffff', 1),
  book('hawking-kratchajshaja-istorija-vremeni', 'Стивен Хокинг', 'Кратчайшая история времени', 'ru', 'nonfic', '#141414', '#ffffff', 1),

  // English-language shelf
  book('arlou-belarus-illustrated-history', 'Uladzimir Arloŭ, Paviel Tatarnikaŭ', 'Belarus: An Illustrated History. From Rahnieda to Kaściuška', 'en', 'history', '#17171a', '#d9a441'),
  book('harady-bielarusi-na-pastoukach', 'Вячка Целеш', 'Гарады Беларусі на старых паштоўках', 'be', 'history', '#b8862f', '#2a1c08'),
  book('basak-forest-bogeyfolk', 'Artur Basak', 'Belarusian Bogeyfolk: Forest', 'en', 'folk', '#1f5f9c', '#ffffff', 1),
  book('thengvall-business-value-devrel', 'Mary Thengvall', 'The Business Value of Developer Relations', 'en', 'tech', '#f4f4f4', '#2f4f6f'),
  book('martin-clean-architecture', 'Robert C. Martin', 'Clean Architecture', 'en', 'tech', '#f8f8f8', '#111111', 3),
  book('alammar-hands-on-llm', 'Jay Alammar, Maarten Grootendorst', 'Hands-On Large Language Models', 'en', 'tech', '#fafafa', '#222222', 3),
  book('lewko-developer-relations', 'Caroline Lewko, James Parton', 'Developer Relations', 'en', 'tech', '#f6f6f6', '#d23a3a'),
  book('amidi-super-study-guide-llm', 'Afshine Amidi, Shervine Amidi', 'Super Study Guide: Transformers & Large Language Models', 'en', 'tech', '#9c1f2e', '#ffffff'),
  book('slashdata-developer-marketing', 'SlashData', 'Developer Marketing + Relations: The Essential Guide', 'en', 'tech', '#f3f5f5', '#157e8a'),
  book('galczynski-vulica-sarlatanau', 'Канстанты Ільдэфанс Галчыньскі', 'Вуліца Шарлатанаў', 'be', 'poetry', '#1d7a6c', '#f1e6c8', 3),
  book('rowling-chamber-of-secrets-en', 'J. K. Rowling', 'Harry Potter and the Chamber of Secrets', 'en', 'sf', '#2a2c2b', '#d9c47a'),
  book('acemoglu-why-nations-fail', 'Daron Acemoglu, James A. Robinson', 'Why Nations Fail', 'en', 'nonfic', '#1f3f6f', '#ffffff', 3),
  book('orwell-1984', 'Джордж Оруэл', '1984', 'be', 'fiction', '#c8252f', '#2a0d0f'),
  book('orwell-fierma-zyviolau', 'Джордж Оруэл', 'Ферма жывёлаў', 'be', 'fiction', '#1e7a44', '#e6f2ea', 1),

  // folklore, heritage and new Belarusian writing
  volume('basak-niacysciki-vodnyja', 'Артур Басак', 'Беларускія нячысцікі. Водныя і балотныя', 'be', 'folk', 'Беларускія нячысцікі', 2, 1),
  volume('basak-niacysciki-liasnyja', 'Артур Басак', 'Беларускія нячысцікі. Лясныя', 'be', 'folk', 'Беларускія нячысцікі', 1, 1),
  book('zycciadajnyja-krynicy', 'Аляксей Ненадавец', 'Жыццядайныя крыніцы. Легенды і паданні', 'be', 'folk', '#1f8da1', '#ffffff'),
  volume('patajemnaja-spadcyna-1', '', 'Патаемная спадчына. Казкі пра беларускіх жанчын. Том I', 'be', 'history', 'Патаемная спадчына', 1),
  volume('patajemnaja-spadcyna-2', '', 'Патаемная спадчына. Казкі пра беларускіх жанчын. Том II', 'be', 'history', 'Патаемная спадчына', 2),
  book('mysl-bialoruska-xx-wieku', 'Юры Гарбінскі', 'Беларуская думка XX стагоддзя / Myśl białoruska XX wieku', 'be', 'history', '#4a342a', '#d9b45a', 3),
  book('biel-cyrvona-biely', '', 'Бел-чырвона-белы', 'be', 'history', '#f7f7f7', '#d22630', 3),
  book('irdorath-bestiarium', 'Irdorath', 'Bestiarium', 'be', 'folk', '#111111', '#d9a82f'),
  book('barsceuski-sliachcic-zavalnia', 'Ян Баршчэўскі', 'Шляхціц Завальня', 'be', 'fiction', '#5a3fa0', '#ffffff', 3),
  book('carnucha-hvalt', 'Аляксандар Чарнуха', 'Гвалт', 'be', 'fiction', '#8f1f33', '#ffffff'),
  book('arkus-jak-padaje-snieh', 'Алесь Аркуш', 'Як падае сьнег, як расьце трава', 'be', 'fiction', '#7f8fb0', '#1f2433'),
  book('horvat-radziva-prudok', 'Андрусь Горват', 'Радзіва «Прудок». Дзёньнік', 'be', 'fiction', '#f4f4f2', '#444444'),
  book('ryzkou-dzviery-zamknionyja-na-klucy', 'Віталь Рыжкоў', 'Дзверы, замкнёныя на ключы', 'be', 'poetry', '#161616', '#f2d23a', 1),
  book('hapiejeva-v-jadomyja-historyi', 'Вольга Гапеева', '(В)ядомыя гісторыі', 'be', 'fiction', '#f5f3ee', '#b0392e', 1),

  // the small shelf
  book('corny-posuki-buducyni', 'Кузьма Чорны', 'Пошукі будучыні', 'be', 'fiction', '#1f5f4a', '#ffffff'),
  book('kupala-tutejsyja', 'Янка Купала', 'Тутэйшыя. Выбраныя творы', 'be', 'fiction', '#4a2f2a', '#ffffff'),
  book('karatkievich-ladzdzia-rospacy', 'Уладзімір Караткевіч', 'Ладдзя Роспачы', 'be', 'fiction', '#1a1a1a', '#dddddd', 1),
  book('bielavieskin-sto-jesci', 'Андрусь Белавешкін', 'Што есьці і калі есьці', 'be', 'nonfic', '#d9701a', '#ffffff'),
  book('bielavieskin-volia-da-zyccia', 'Андрусь Белавешкін', 'Воля да жыцьця', 'be', 'nonfic', '#1f7a3f', '#ffffff', 3),

  // the Grand Duchy of Lithuania
  volume('vkl-encyklapiedyja-1', '', 'Вялікае Княства Літоўскае. Энцыклапедыя. Том 1 (А–К)', 'be', 'history', 'Вялікае Княства Літоўскае. Энцыклапедыя', 1, 3),
  volume('vkl-encyklapiedyja-2', '', 'Вялікае Княства Літоўскае. Энцыклапедыя. Том 2 (К–Я)', 'be', 'history', 'Вялікае Княства Літоўскае. Энцыклапедыя', 2, 3),
  book('hulecki-100-manet-vkl', 'Дзмітрый Гулецкі, Мікалай Дарашкевіч', '100 манет Вялікага Княства Літоўскага', 'be', 'history', '#1b1f2e', '#d9c58a', 1),
  book('hraviury-skaryny', 'Лявон Баразна', 'Гравюры Францыска Скарыны', 'be', 'history', '#e9dfc4', '#7d5f17'),
  book('aleksandrovic-kartahrafija-vkl', 'Станіслаў Александровіч', 'Картаграфія Вялікага Княства Літоўскага ад XV да сярэдзіны XVIII стагоддзя', 'be', 'history', '#a8564e', '#ffffff'),
  book('adamovic-jan-niaprecki', 'Аляксей Адамовіч', 'Ян Няпрэцкі і карта Вялікага Княства Літоўскага', 'be', 'history', '#17171a', '#cfcfcf'),

  // Belarusian classics
  book('karatkievich-dzikaje-palavannie', 'Уладзімір Караткевіч', 'Дзікае паляванне караля Стаха', 'be', 'fiction', '#1b1b1d', '#d8d8d8', 3),
  book('karatkievich-kalasy-white', 'Уладзімір Караткевіч', 'Каласы пад сярпом тваім', 'be', 'fiction', '#f3f1ee', '#c8202f', 3),
  book('karatkievich-kalasy-yellow', 'Уладзімір Караткевіч', 'Каласы пад сярпом тваім', 'be', 'fiction', '#f6efc9', '#c8202f', 3),
  book('bykau-znak-biady', 'Васіль Быкаў', 'Знак бяды', 'be', 'fiction', '#fafafa', '#333333'),
  book('mielez-ludzi-na-balocie', 'Іван Мележ', 'Людзі на балоце', 'be', 'fiction', '#e9e2d3', '#111111'),
  book('kolas-na-rostaniach', 'Якуб Колас', 'На ростанях', 'be', 'fiction', '#161616', '#f08a2a', 3),
  book('bacharevic-sabaki-europy', 'Альгерд Бахарэвіч', 'Сабакі Эўропы', 'be', 'fiction', '#34917a', '#ffffff', 3),
  book('kupala-vybranaje', 'Янка Купала', 'Выбранае', 'be', 'poetry', '#e9c9c4', '#2a2a2a'),
  book('sieviaryniec-hascinica-bielhija', 'Ганна Севярынец', 'Гасцініца «Бельгія». Дзень Святога Патрыка', 'be', 'fiction', '#161616', '#eeeeee', 3),

  // history, language and dictionaries
  book('arlou-kraina-bielarus', 'Уладзімір Арлоў, Зьміцер Герасімовіч', 'Краіна Беларусь. Ілюстраваная гісторыя', 'be', 'history', '#17171a', '#ffffff'),
  book('danilovic-slova-i-frazealahizm', 'М. А. Даніловіч', 'Слова і фразеалагізм у беларускай мове', 'be', 'lang', '#f4eeee', '#c02a3a'),
  book('cyrvinski-bielarus-u-vojnach', 'Віталь Чырвінскі', 'Беларусь у войнах Расійскай імперыі: асобы і падзеі', 'be', 'history', '#b8a377', '#8f1d1d', 3),
  book('starabielaruskaja-litaratura', 'Галіна Тварановіч', 'Старабеларуская літаратура', 'be', 'history', '#2a1a20', '#d9a860', 3),
  book('michaluk-bnr-1918-1920', 'Дарота Міхалюк', 'Беларуская Народная Рэспубліка ў 1918–1920 гг. Ля вытокаў беларускай дзяржаўнасці', 'be', 'history', '#2f2f2f', '#e0d6bd', 3),
  book('piesnia-piesniau', '', 'Песьня песьняў', 'be', 'poetry', '#2f9e5f', '#12301f'),
  book('raslinny-sviet-slounik', '', 'Раслінны свет. Тэматычны слоўнік', 'be', 'lang', '#f3f1ec', '#222222', 3),
  book('savicki-slounik-pa-infarmatycy', 'М. І. Савіцкі', 'Тлумачальны слоўнік па інфарматыцы', 'be', ['lang', 'tech'], '#a9c4e0', '#1d2f4f'),
  book('arendt-pra-calaviecnasc', 'Ханна Арэнт', 'Пра чалавечнасць у цёмныя часы', 'be', 'nonfic', '#1f2f9c', '#e7b0c0', 3),
  book('leksicny-atlas-5', '', 'Лексічны атлас беларускіх народных гаворак. Том 5', 'be', 'lang', '#6c6c70', '#f0d382', 3),
  // added from the owner's photos, 2026-09-22
  book('niaklajeu-kniha-losau', 'Уладзімір Някляеў', 'Кніга лёсаў', 'be', 'poetry', '#f2f2f0', '#c4562f'),
  book('mify-backauscyny', 'Уладзімір Васілевіч', 'Міфы Бацькаўшчыны', 'be', 'folk', '#6a6f8f', '#ffffff', 1),
  book('kazakova-mifalahiemy-i-mahija', 'І. В. Казакова', 'Міфалагемы і магія ў беларускім абрадавым фальклоры', 'be', 'folk', '#5fa8d8', '#10243a', 1),
  book('padlasskaje-na-uik-end', '', 'Падляшскае на ўік-энд', 'be', 'nonfic', '#2a2f33', '#f08a3c', 1),
  book('arlou-imiony-svabody-1', 'Уладзімір Арлоў', 'Імёны Свабоды. 1', 'be', 'history', '#1f5a5f', '#f0d23a', 3),
  book('ruska-bielaruski-slounik-1953', '', 'Руска-беларускі слоўнік', 'be', 'lang', '#4a3a30', '#d9c08a', 3),
  book('tradycyjny-svietapohlad-1', '', 'Традыцыйны светапогляд беларусаў. Кніга 1. Касмалогія', 'be', 'folk', '#2b3160', '#e3a93c'),
  book('buraukin-nahavarycca-z-zorkami', 'Генадзь Бураўкін', 'Нагаварыцца з зоркамі', 'be', 'poetry', '#f4f4f4', '#222222', 1),
  book('pirs-ja-vychodzu', 'Л. Пірс', 'Я выходжу', 'be', 'history', '#f7f7f7', '#c8252f'),
  book('sciezkami-mifau', '', 'Сцежкамі міфаў', 'be', 'folk', '#161a3a', '#e8a33a'),
]

// Default order of the library: by language, and within a language the series first
// (series by name, volumes by number), then the single books by author — filed under the
// surname — and by title within one author. Books with no author close the language, by title.
export const LANG_ORDER = ['be', 'en', 'pl', 'ru']

// «(Ня)чысты Мінск» sorts under Н, «[Пра] мастацтва» under П: punctuation does not count
const sortKey = (text) => text.replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

// Names are printed «Імя Прозьвішча», so the surname is the last word of the first author.
// The exceptions are compound surnames and collectives, which would otherwise be filed under their tail.
const SURNAMES = {
  'Владстон Феррейра Фило': 'Феррейра Фило',
  '«Шуфлядка пісьменніка»': 'Шуфлядка пісьменніка',
}
// every language a book is printed in, the main one first
export const langsOf = (b) => [b.lang, ...(b.also ?? [])]

export const surnameOf = (author) => {
  const first = author.split(',')[0].trim()
  return sortKey(SURNAMES[first] ?? first.split(' ').at(-1))
}

// Browsers ship different collation data: with the same 'be' locale Chrome puts Latin before
// Cyrillic and Node after it. So the script order is decided here — digits, Cyrillic, the rest —
// and localeCompare only orders the letters within a script.
const scriptRank = (text) => (/^\p{Nd}/u.test(text) ? 0 : /^\p{Script=Cyrillic}/u.test(text) ? 1 : 2)
export const compareText = (a, b, lang) =>
  scriptRank(a) - scriptRank(b) || a.localeCompare(b, lang, { numeric: true })

function byShelfOrder(a, b) {
  if (a.lang !== b.lang) return LANG_ORDER.indexOf(a.lang) - LANG_ORDER.indexOf(b.lang)
  if (!a.series !== !b.series) return a.series ? -1 : 1
  if (a.series && a.series !== b.series) return compareText(sortKey(a.series), sortKey(b.series), a.lang)
  if (a.series) return a.part - b.part
  if (!a.author !== !b.author) return a.author ? -1 : 1
  return (
    compareText(surnameOf(a.author), surnameOf(b.author), a.lang) ||
    compareText(sortKey(a.author), sortKey(b.author), a.lang) ||
    compareText(sortKey(a.title), sortKey(b.title), a.lang)
  )
}

export const LIBRARY = BOOKS.map((b) => ({
  ...b,
  ...(ALSO_IN[b.id] && { also: ALSO_IN[b.id] }),
  ...LIBRARY_FACTS[b.id],
  ...(LIBRARY_FACTS[b.id]?.cover && { image: `/images/library/${b.id}.webp` }),
})).sort(byShelfOrder)

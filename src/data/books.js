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

// Home library, shelf by shelf, in the order the books stand.
// Authors and titles are kept exactly as printed on the spine, in the book's own language.
//   lang  — language of the edition: be / ru / en / pl
//   tags  — categories for the filter chips (see `filters` in content/books.md)
//   spine — spine colour, ink — lettering colour, both picked from the real book
//   size  — spine thickness: 1 thin, 2 regular, 3 thick
// The note for each book lives in content/library.md under the same id; the
// facts for its card (year, publisher, translator…) are in LIBRARY_FACTS below.
// Facts for the book cards, by id: what the edition itself states (year, publisher,
// city, translator, isbn, pages), and `cover: true` when public/images/library/<id>.webp exists.
const LIBRARY_FACTS = {}

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

export const LIBRARY = [
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
  book('noradrenalin-poudzien', '', 'Норадрэналін. Поўдзень', 'be', 'fiction', '#25262b', '#ffffff', 3),
  book('shapran-bykau-pra-mastactva', 'Сяргей Шапран', 'Васіль Быкаў. [Пра] мастацтва', 'be', 'nonfic', '#f7f7f5', '#333333', 3),
  book('buraukin-prazhytaje-napisanaje', 'Генадзь Бураўкін', 'Пражытае-напісанае', 'be', 'nonfic', '#2f86bd', '#ffffff', 3),
  book('hlinistaja-kalychanka-dla-minska', 'Кацярына Гліністая', 'Калыханка для Мінска', 'be', 'sf', '#2b2d52', '#f0c987'),
  book('nia-czysty-minsk', '', '(Ня)чысты Мінск', 'be', 'sf', '#1c2a44', '#e9d9a6'),
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
  volume('sapkowski-1-aposniaje-zadannie', 'Анджэй Сапкоўскі', 'Апошняе жаданне', 'be', 'sf', 'Вядзьмар', 1),
  volume('sapkowski-2-miec-nakanavannia', 'Анджэй Сапкоўскі', 'Меч наканавання', 'be', 'sf', 'Вядзьмар', 2),
  volume('sapkowski-3-krou-elfau', 'Анджэй Сапкоўскі', 'Кроў эльфаў', 'be', 'sf', 'Вядзьмар', 3),
  volume('sapkowski-4-cas-pahardy', 'Анджэй Сапкоўскі', 'Час пагарды', 'be', 'sf', 'Вядзьмар', 4),
  volume('sapkowski-5-chryscennie-ahniom', 'Анджэй Сапкоўскі', 'Хрышчэнне агнём', 'be', 'sf', 'Вядзьмар', 5),
  volume('grzedowicz-haspadar-1', 'Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том I', 'be', 'sf', 'Гаспадар Ледзянога саду', 1, 3),
  volume('grzedowicz-haspadar-2', 'Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том II', 'be', 'sf', 'Гаспадар Ледзянога саду', 2, 3),
  volume('grzedowicz-haspadar-3', 'Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том III', 'be', 'sf', 'Гаспадар Ледзянога саду', 3, 3),
  book('lem-zornyja-dzionniki', 'Станіслаў Лем', 'Зорныя дзённікі', 'be', 'sf', '#1f2a38', '#7fb6e8'),

  // Russian-language shelf
  book('biblija-dore', '', 'Библия. С иллюстрациями Гюстава Доре', 'ru', 'nonfic', '#3a2618', '#d9b15a', 3),
  book('verne-deti-kapitana-granta', 'Жюль Верн', 'Дети капитана Гранта', 'ru', 'fiction', '#5f8fc4', '#ffffff', 3),
  book('goldratt-cel', 'Элияху Голдратт, Джефф Кокс', 'Цель. Процесс непрерывного улучшения', 'ru', 'tech', '#161616', '#ffffff'),
  book('mitnick-prizrak-v-seti', 'Кевин Митник, Уильям Саймон', 'Призрак в сети. Мемуары величайшего хакера', 'ru', 'tech', '#1c4fb0', '#ffffff'),
  book('petzold-kod', 'Чарльз Петцольд', 'Код', 'ru', 'tech', '#f6f6f4', '#8a6a22'),
  book('ferreira-filho-computer-science', 'Владстон Феррейра Фило', 'Теоретический минимум по Computer Science', 'ru', 'tech', '#44902a', '#ffffff', 1),
  book('hawking-kratchajshaja-istorija-vremeni', 'Стивен Хокинг', 'Кратчайшая история времени', 'ru', 'nonfic', '#141414', '#ffffff', 1),

  // English-language shelf
  book('arlou-belarus-illustrated-history', 'Uladzimir Arloŭ', 'Belarus: An Illustrated History. From Rahnieda to Kaściuška', 'en', 'history', '#17171a', '#d9a441'),
  book('harady-bielarusi-na-pastoukach', '', 'Гарады Беларусі на старых паштоўках', 'be', 'history', '#b8862f', '#2a1c08'),
  book('basak-forest-bogeyfolk', 'Artur Basak', 'Belarusian Forest Bogeyfolk', 'en', 'folk', '#1f5f9c', '#ffffff', 1),
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
  book('zycciadajnyja-krynicy', '', 'Жыццядайныя крыніцы. Легенды і паданні', 'be', 'folk', '#1f8da1', '#ffffff'),
  volume('patajemnaja-spadcyna-1', '', 'Патаемная спадчына. Казкі пра беларускіх жанчын. Том I', 'be', 'history', 'Патаемная спадчына', 1),
  volume('patajemnaja-spadcyna-2', '', 'Патаемная спадчына. Казкі пра беларускіх жанчын. Том II', 'be', 'history', 'Патаемная спадчына', 2),
  book('mysl-bialoruska-xx-wieku', '', 'Myśl białoruska XX wieku. Antologia', 'pl', 'history', '#4a342a', '#d9b45a', 3),
  book('biel-cyrvona-biely', '', 'Бел-чырвона-белы', 'be', 'history', '#f7f7f7', '#d22630', 3),
  book('irdorath-bestiarium', 'Irdorath', 'Bestiarium', 'be', 'folk', '#111111', '#d9a82f'),
  book('barsceuski-sliachcic-zavalnia', 'Ян Баршчэўскі', 'Шляхціц Завальня', 'be', 'fiction', '#5a3fa0', '#ffffff', 3),
  book('carnucha-hvalt', 'Аляксандар Чарнуха', 'Гвалт', 'be', 'fiction', '#8f1f33', '#ffffff'),
  book('arkus-jak-padaje-snieh', 'Алесь Аркуш', 'Як падае сьнег, як расьце трава', 'be', 'fiction', '#7f8fb0', '#1f2433'),
  book('horvat-radziva-prudok', 'Андрусь Горват', 'Радзіва «Прудок». Дзёньнік', 'be', 'fiction', '#f4f4f2', '#444444'),
  book('ryzkou-dzviery-zamknionyja-na-klucy', 'Віталь Рыжкоў', 'Дзверы, замкнёныя на ключы', 'be', 'poetry', '#161616', '#f2d23a', 1),
  book('hapiejeva-v-jadomyja-historyi', 'Вольга Гапеева', '(В)ядомыя гісторыі', 'be', 'poetry', '#f5f3ee', '#b0392e', 1),

  book('corny-posuki-buducyni', 'Кузьма Чорны', 'Пошукі будучыні', 'be', 'fiction', '#1f5f4a', '#ffffff'),
  book('kupala-tutejsyja', 'Янка Купала', 'Тутэйшыя. Выбраныя творы', 'be', 'fiction', '#4a2f2a', '#ffffff'),
  book('karatkievich-ladzdzia-rospacy', 'Уладзімір Караткевіч', 'Ладдзя Роспачы', 'be', 'fiction', '#1a1a1a', '#dddddd', 1),
  book('bielavieskin-sto-jesci', 'Андрусь Белавешкін', 'Што есьці і калі есьці', 'be', 'nonfic', '#d9701a', '#ffffff'),
  book('bielavieskin-volia-da-zyccia', 'Андрусь Белавешкін', 'Воля да жыцьця', 'be', 'nonfic', '#1f7a3f', '#ffffff', 3),

  // the Grand Duchy of Lithuania
  volume('vkl-encyklapiedyja-1', '', 'Вялікае Княства Літоўскае. Энцыклапедыя. Том 1 (А–К)', 'be', 'history', 'Вялікае Княства Літоўскае. Энцыклапедыя', 1, 3),
  volume('vkl-encyklapiedyja-2', '', 'Вялікае Княства Літоўскае. Энцыклапедыя. Том 2 (К–Я)', 'be', 'history', 'Вялікае Княства Літоўскае. Энцыклапедыя', 2, 3),
  book('hulecki-100-manet-vkl', 'Дзмітрый Гулецкі, Мікалай Дарашкевіч', '100 манет Вялікага Княства Літоўскага', 'be', 'history', '#1b1f2e', '#d9c58a', 1),
  book('hraviury-skaryny', '', 'Гравюры Францыска Скарыны', 'be', 'history', '#e9dfc4', '#7d5f17'),
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
  book('starabielaruskaja-litaratura', '', 'Старабеларуская літаратура', 'be', 'history', '#2a1a20', '#d9a860', 3),
  book('michaluk-bnr-1918-1920', 'Дарота Міхалюк', 'Беларуская Народная Рэспубліка ў 1918–1920 гг. Ля вытокаў беларускай дзяржаўнасці', 'be', 'history', '#2f2f2f', '#e0d6bd', 3),
  book('piesnia-piesniau', '', 'Песьня песьняў', 'be', 'poetry', '#2f9e5f', '#12301f'),
  book('raslinny-sviet-slounik', '', 'Раслінны свет. Тэматычны слоўнік', 'be', 'lang', '#f3f1ec', '#222222', 3),
  book('savicki-slounik-pa-infarmatycy', 'М. І. Савіцкі', 'Тлумачальны слоўнік па інфарматыцы', 'be', ['lang', 'tech'], '#a9c4e0', '#1d2f4f'),
  book('arendt-pra-calaviecnasc', 'Ханна Арэнт', 'Пра чалавечнасць у цёмныя часы', 'be', 'nonfic', '#1f2f9c', '#e7b0c0', 3),
  book('leksicny-atlas-5', '', 'Лексічны атлас беларускіх народных гаворак. Том 5', 'be', 'lang', '#6c6c70', '#f0d382', 3),
].map((b) => ({
  ...b,
  ...LIBRARY_FACTS[b.id],
  ...(LIBRARY_FACTS[b.id]?.cover && { image: `/images/library/${b.id}.webp` }),
}))

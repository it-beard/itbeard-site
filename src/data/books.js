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
const book = (author, title, lang, tags, spine, ink, size = 2, series) => ({
  author,
  title,
  lang,
  tags: [].concat(tags),
  spine,
  ink,
  size,
  ...(series && { series }),
})

export const LIBRARY = [
  // science fiction in Russian
  book('Аластер Рейнольдс', 'Дом солнц', 'ru', 'sf', '#cdbfb3', '#4a3c38', 3),
  book('Сергей Снегов', 'Люди как боги', 'ru', 'sf', '#2b2f8f', '#f1d9a0', 3),
  book('Лю Цысинь', 'Задача трёх тел', 'ru', 'sf', '#2a1d17', '#ffffff', 3),
  book('Лю Цысинь', 'Тёмный лес', 'ru', 'sf', '#10294d', '#ffffff', 3),
  book('Лю Цысинь', 'Вечная жизнь Смерти', 'ru', 'sf', '#7a2416', '#ffffff', 3),
  book('Митио Каку', 'Будущее человечества', 'ru', 'nonfic', '#f1f1f4', '#31408f', 3),

  // new Belarusian prose and fantasy
  book('Маргарыта Латышкевіч', 'Век людзей', 'be', 'sf', '#1d1f26', '#d9a441', 3),
  book('Алесь Бычкоўскі', 'Дзеці Сільмарыліёна', 'be', 'fiction', '#1f2340', '#ffffff'),
  book('Арцём Шуканаў', 'Пентаквантар. Кніга 1', 'be', 'sf', '#d2661f', '#ffffff'),
  book('Арцём Шуканаў', 'Пентаквантар. Кніга 2', 'be', 'sf', '#c2457f', '#ffffff'),
  book('', 'Норадрэналін. Поўдзень', 'be', 'fiction', '#25262b', '#ffffff', 3),
  book('Сяргей Шапран', 'Васіль Быкаў. [Пра] мастацтва', 'be', 'nonfic', '#f7f7f5', '#333333', 3),
  book('Генадзь Бураўкін', 'Пражытае-напісанае', 'be', 'nonfic', '#2f86bd', '#ffffff', 3),
  book('Кацярына Гліністая', 'Калыханка для Мінска', 'be', 'sf', '#2b2d52', '#f0c987'),
  book('', '(Ня)чысты Мінск', 'be', 'sf', '#1c2a44', '#e9d9a6'),
  book('Дж. Р. Р. Толкін', 'Уладар Пярсьцёнкаў. 1. Зьвяз Пярсьцёнка', 'be', 'sf', '#f3efe6', '#a3281f'),
  book('Генадзь Бураўкін', 'Мой боль і запавет', 'be', 'poetry', '#8a8a8a', '#1d1d1d'),
  book('Уладзімір Караткевіч', 'Дзікае паляванне караля Стаха', 'be', 'fiction', '#15181a', '#ffffff', 1),

  // Tolkien in Ihar Kulikou's translation, and Dune
  book('Дж. Р. Р. Толкін', 'Валадар Пярсцёнкаў. 1. Брацтва Пярсцёнка', 'be', 'sf', '#15161a', '#d9b45a', 3),
  book('Дж. Р. Р. Толкін', 'Валадар Пярсцёнкаў. 2. Дзве вежы', 'be', 'sf', '#3a2326', '#d9b45a', 3),
  book('Дж. Р. Р. Толкін', 'Валадар Пярсцёнкаў. 3. Вяртанне караля', 'be', 'sf', '#232a3d', '#d9b45a', 3),
  book('Фрэнк Герберт', 'Дзюна', 'be', 'sf', '#1f2433', '#e7d3a8', 3),

  // world fiction in Belarusian
  book('Эндзі Ўір', 'Марсіянін', 'be', 'sf', '#c4623a', '#ffffff', 3),
  book('Антуан дэ Сент-Экзюперы', 'Маленькі прынц', 'be', 'fiction', '#1d78a6', '#ffffff', 1),
  book('Кормак Макарці', 'Дарога', 'be', 'fiction', '#141414', '#e0a23a'),
  book('К. С. Льюіс', 'Леў, вядзьмарка і гардэроб', 'be', 'sf', '#f5f1e6', '#3a3a3a', 2, 'Хронікі Нарніі'),
  book('К. С. Льюіс', 'Прынц Каспіян', 'be', 'sf', '#6b6680', '#ffffff', 2, 'Хронікі Нарніі'),
  book('К. С. Льюіс', 'Конь і яго хлопчык', 'be', 'sf', '#e9a23b', '#4a3210', 2, 'Хронікі Нарніі'),
  book('Дж. К. Роўлінг', 'Гары Потэр і філасофскі камень', 'be', 'sf', '#1b1b1f', '#e23b4e', 2),
  book('Дж. К. Роўлінг', 'Гары Потэр і Таемная зала', 'be', 'sf', '#1b1b1f', '#e3c25a', 2),
  book('Дж. К. Роўлінг', 'Гары Потэр і вязень Азкабана', 'be', 'sf', '#1b1b1f', '#b85fd1', 2),
  book('Дж. К. Роўлінг', 'Гары Потэр і Келіх агню', 'be', 'sf', '#1b1b1f', '#3d8fe0', 3),
  book('Рэй Брэдберы', 'Марсіянскія хронікі', 'be', 'sf', '#ef5d7a', '#2a1a1f'),
  book('Дуглас Адамс', 'Аўтаспынам па Галактыцы', 'be', 'sf', '#17171a', '#f0a028'),

  // epics and sagas
  book('Гамер', 'Іліяда', 'be', 'poetry', '#111111', '#f0a13a', 3),
  book('Анджэй Сапкоўскі', 'Апошняе жаданне', 'be', 'sf', '#2c3033', '#e8e8e8', 2, 'Вядзьмар'),
  book('Анджэй Сапкоўскі', 'Меч наканавання', 'be', 'sf', '#2c3033', '#e8e8e8', 2, 'Вядзьмар'),
  book('Анджэй Сапкоўскі', 'Кроў эльфаў', 'be', 'sf', '#2c3033', '#e8e8e8', 2, 'Вядзьмар'),
  book('Анджэй Сапкоўскі', 'Час пагарды', 'be', 'sf', '#2c3033', '#e8e8e8', 2, 'Вядзьмар'),
  book('Анджэй Сапкоўскі', 'Хрышчэнне агнём', 'be', 'sf', '#2c3033', '#e8e8e8', 2, 'Вядзьмар'),
  book('Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том I', 'be', 'sf', '#4a4338', '#f1ead6', 3),
  book('Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том II', 'be', 'sf', '#3f3a36', '#f1ead6', 3),
  book('Яраслаў Гжэндовіч', 'Гаспадар Ледзянога саду. Том III', 'be', 'sf', '#7a6a3e', '#f1ead6', 3),
  book('Станіслаў Лем', 'Зорныя дзённікі', 'be', 'sf', '#1f2a38', '#7fb6e8'),

  // Russian-language shelf
  book('', 'Библия. С иллюстрациями Гюстава Доре', 'ru', 'nonfic', '#3a2618', '#d9b15a', 3),
  book('Жюль Верн', 'Дети капитана Гранта', 'ru', 'fiction', '#5f8fc4', '#ffffff', 3),
  book('Элияху Голдратт, Джефф Кокс', 'Цель. Процесс непрерывного улучшения', 'ru', 'tech', '#161616', '#ffffff'),
  book('Кевин Митник, Уильям Саймон', 'Призрак в сети. Мемуары величайшего хакера', 'ru', 'tech', '#1c4fb0', '#ffffff'),
  book('Чарльз Петцольд', 'Код', 'ru', 'tech', '#f6f6f4', '#8a6a22'),
  book('Владстон Феррейра Фило', 'Теоретический минимум по Computer Science', 'ru', 'tech', '#44902a', '#ffffff', 1),
  book('Стивен Хокинг', 'Кратчайшая история времени', 'ru', 'nonfic', '#141414', '#ffffff', 1),

  // English-language shelf
  book('Uladzimir Arloŭ', 'Belarus: An Illustrated History. From Rahnieda to Kaściuška', 'en', 'history', '#17171a', '#d9a441'),
  book('', 'Гарады Беларусі на старых паштоўках', 'be', 'history', '#b8862f', '#2a1c08'),
  book('Artur Basak', 'Belarusian Forest Bogeyfolk', 'en', 'folk', '#1f5f9c', '#ffffff', 1),
  book('Mary Thengvall', 'The Business Value of Developer Relations', 'en', 'tech', '#f4f4f4', '#2f4f6f'),
  book('Robert C. Martin', 'Clean Architecture', 'en', 'tech', '#f8f8f8', '#111111', 3),
  book('Jay Alammar, Maarten Grootendorst', 'Hands-On Large Language Models', 'en', 'tech', '#fafafa', '#222222', 3),
  book('Caroline Lewko, James Parton', 'Developer Relations', 'en', 'tech', '#f6f6f6', '#d23a3a'),
  book('Afshine Amidi, Shervine Amidi', 'Super Study Guide: Transformers & Large Language Models', 'en', 'tech', '#9c1f2e', '#ffffff'),
  book('SlashData', 'Developer Marketing + Relations: The Essential Guide', 'en', 'tech', '#f3f5f5', '#157e8a'),
  book('Канстанты Ільдэфанс Галчыньскі', 'Вуліца Шарлатанаў', 'be', 'poetry', '#1d7a6c', '#f1e6c8', 3),
  book('J. K. Rowling', 'Harry Potter and the Chamber of Secrets', 'en', 'sf', '#2a2c2b', '#d9c47a'),
  book('Daron Acemoglu, James A. Robinson', 'Why Nations Fail', 'en', 'nonfic', '#1f3f6f', '#ffffff', 3),
  book('Джордж Оруэл', '1984', 'be', 'fiction', '#c8252f', '#2a0d0f'),
  book('Джордж Оруэл', 'Ферма жывёлаў', 'be', 'fiction', '#1e7a44', '#e6f2ea', 1),

  // folklore, heritage and new Belarusian writing
  book('Артур Басак', 'Беларускія нячысцікі. Водныя і балотныя', 'be', 'folk', '#121212', '#ffffff', 1),
  book('Артур Басак', 'Беларускія нячысцікі. Лясныя', 'be', 'folk', '#121212', '#e2b93b', 1),
  book('', 'Жыццядайныя крыніцы. Легенды і паданні', 'be', 'folk', '#1f8da1', '#ffffff'),
  book('', 'Патаемная спадчына. Казкі пра беларускіх жанчын. Том I', 'be', 'history', '#3a2f7a', '#e7c25a'),
  book('', 'Патаемная спадчына. Казкі пра беларускіх жанчын. Том II', 'be', 'history', '#6a2238', '#e7c25a'),
  book('', 'Myśl białoruska XX wieku. Antologia', 'pl', 'history', '#4a342a', '#d9b45a', 3),
  book('', 'Бел-чырвона-белы', 'be', 'history', '#f7f7f7', '#d22630', 3),
  book('Irdorath', 'Bestiarium', 'be', 'folk', '#111111', '#d9a82f'),
  book('Ян Баршчэўскі', 'Шляхціц Завальня', 'be', 'fiction', '#5a3fa0', '#ffffff', 3),
  book('Аляксандар Чарнуха', 'Гвалт', 'be', 'fiction', '#8f1f33', '#ffffff'),
  book('Алесь Аркуш', 'Як падае сьнег, як расьце трава', 'be', 'fiction', '#7f8fb0', '#1f2433'),
  book('Андрусь Горват', 'Радзіва «Прудок». Дзёньнік', 'be', 'fiction', '#f4f4f2', '#444444'),
  book('Віталь Рыжкоў', 'Дзверы, замкнёныя на ключы', 'be', 'poetry', '#161616', '#f2d23a', 1),
  book('Вольга Гапеева', '(В)ядомыя гісторыі', 'be', 'poetry', '#f5f3ee', '#b0392e', 1),

  book('Кузьма Чорны', 'Пошукі будучыні', 'be', 'fiction', '#1f5f4a', '#ffffff'),
  book('Янка Купала', 'Тутэйшыя. Выбраныя творы', 'be', 'fiction', '#4a2f2a', '#ffffff'),
  book('Уладзімір Караткевіч', 'Ладдзя Роспачы', 'be', 'fiction', '#1a1a1a', '#dddddd', 1),
  book('Андрусь Белавешкін', 'Што есьці і калі есьці', 'be', 'nonfic', '#d9701a', '#ffffff'),
  book('Андрусь Белавешкін', 'Воля да жыцьця', 'be', 'nonfic', '#1f7a3f', '#ffffff', 3),

  // the Grand Duchy of Lithuania
  book('', 'Вялікае Княства Літоўскае. Энцыклапедыя. Том 1 (А–К)', 'be', 'history', '#cfc4b6', '#5a2f2f', 3),
  book('', 'Вялікае Княства Літоўскае. Энцыклапедыя. Том 2 (К–Я)', 'be', 'history', '#cfc4b6', '#5a2f2f', 3),
  book('Дзмітрый Гулецкі, Мікалай Дарашкевіч', '100 манет Вялікага Княства Літоўскага', 'be', 'history', '#1b1f2e', '#d9c58a', 1),
  book('', 'Гравюры Францыска Скарыны', 'be', 'history', '#e9dfc4', '#7d5f17'),
  book('Станіслаў Александровіч', 'Картаграфія Вялікага Княства Літоўскага ад XV да сярэдзіны XVIII стагоддзя', 'be', 'history', '#a8564e', '#ffffff'),
  book('Аляксей Адамовіч', 'Ян Няпрэцкі і карта Вялікага Княства Літоўскага', 'be', 'history', '#17171a', '#cfcfcf'),

  // Belarusian classics
  book('Уладзімір Караткевіч', 'Дзікае паляванне караля Стаха', 'be', 'fiction', '#1b1b1d', '#d8d8d8', 3),
  book('Уладзімір Караткевіч', 'Каласы пад сярпом тваім', 'be', 'fiction', '#f3f1ee', '#c8202f', 3),
  book('Уладзімір Караткевіч', 'Каласы пад сярпом тваім', 'be', 'fiction', '#f6efc9', '#c8202f', 3),
  book('Васіль Быкаў', 'Знак бяды', 'be', 'fiction', '#fafafa', '#333333'),
  book('Іван Мележ', 'Людзі на балоце', 'be', 'fiction', '#e9e2d3', '#111111'),
  book('Якуб Колас', 'На ростанях', 'be', 'fiction', '#161616', '#f08a2a', 3),
  book('Альгерд Бахарэвіч', 'Сабакі Эўропы', 'be', 'fiction', '#34917a', '#ffffff', 3),
  book('Янка Купала', 'Выбранае', 'be', 'poetry', '#e9c9c4', '#2a2a2a'),
  book('Ганна Севярынец', 'Гасцініца «Бельгія». Дзень Святога Патрыка', 'be', 'fiction', '#161616', '#eeeeee', 3),

  // history, language and dictionaries
  book('Уладзімір Арлоў, Зьміцер Герасімовіч', 'Краіна Беларусь. Ілюстраваная гісторыя', 'be', 'history', '#17171a', '#ffffff'),
  book('М. А. Даніловіч', 'Слова і фразеалагізм у беларускай мове', 'be', 'lang', '#f4eeee', '#c02a3a'),
  book('Віталь Чырвінскі', 'Беларусь у войнах Расійскай імперыі: асобы і падзеі', 'be', 'history', '#b8a377', '#8f1d1d', 3),
  book('', 'Старабеларуская літаратура', 'be', 'history', '#2a1a20', '#d9a860', 3),
  book('Дарота Міхалюк', 'Беларуская Народная Рэспубліка ў 1918–1920 гг. Ля вытокаў беларускай дзяржаўнасці', 'be', 'history', '#2f2f2f', '#e0d6bd', 3),
  book('', 'Песьня песьняў', 'be', 'poetry', '#2f9e5f', '#12301f'),
  book('', 'Раслінны свет. Тэматычны слоўнік', 'be', 'lang', '#f3f1ec', '#222222', 3),
  book('М. І. Савіцкі', 'Тлумачальны слоўнік па інфарматыцы', 'be', ['lang', 'tech'], '#a9c4e0', '#1d2f4f'),
  book('Ханна Арэнт', 'Пра чалавечнасць у цёмныя часы', 'be', 'nonfic', '#1f2f9c', '#e7b0c0', 3),
  book('', 'Лексічны атлас беларускіх народных гаворак. Том 5', 'be', 'lang', '#6c6c70', '#f0d382', 3),
].map((b, i) => ({ ...b, id: `b${i + 1}` }))

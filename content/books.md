---
title:
  be: Мае кнігі
  en: My books
description:
  be: >-
    Хатняя бібліятэка Лёхі Картыньніка і сьпіс рэдкіх беларускіх выданьняў,
    якія ён шукае для сваёй паліцы.
  en: >-
    Lex Kartynnik's home library, and the list of rare Belarusian editions
    he is hunting for.
wantedHint:
  be: 'Кніг у вышуку: {total}'
  en: 'Books on the wanted list: {total}'
libraryHint:
  be: 'Кніг на паліцах: {total}'
  en: 'Books on the shelves: {total}'
filtersLabel: { be: Фільтр кніг па тэмах, en: Filter books by subject }
langFiltersLabel: { be: Фільтр кніг па мовах, en: Filter books by language }
filters:
  all: { be: Усе, en: All }
  sf: { be: Фантастыка і фэнтэзі, en: Sci-fi & fantasy }
  fiction: { be: Мастацкая літаратура, en: Fiction }
  poetry: { be: Паэзія, en: Poetry }
  history: { be: Гісторыя, en: History }
  folk: { be: Міфалогія і фальклор, en: Myth & folklore }
  lang: { be: Мова і слоўнікі, en: Language & dictionaries }
  nonfic: { be: Нон-фікшн, en: Non-fiction }
  tech: { be: IT і праца, en: IT & work }
labels:
  part: { be: частка, en: part }
  year: { be: Год, en: Year }
  translator: { be: Пераклад, en: Translated by }
  publisher: { be: Выданьне, en: Published }
  printRun: { be: Наклад, en: Print run }
  copies: { be: ас., en: copies }
  isbn: { be: ISBN, en: ISBN }
  pages: { be: Старонак, en: Pages }
  language: { be: Мова, en: Language }
  openBook: { be: Адкрыць картку кнігі, en: Open the book card }
  prevOnShelf: { be: Папярэдняя кніга на паліцы, en: Previous book on the shelf }
  nextOnShelf: { be: Наступная кніга на паліцы, en: Next book on the shelf }
  source: { be: Пра выданьне, en: About this edition }
  close: { be: Зачыніць, en: Close }
  share: { be: Падзяліцца, en: Share }
  copied: { be: Спасылка скапіяваная, en: Link copied }
  prev: { be: Папярэдняя кніга, en: Previous book }
  next: { be: Наступная кніга, en: Next book }
  openHint: { be: Разгледзець вокладку, en: View the cover }
  scrollPrev: { be: Пракруціць назад, en: Scroll back }
  scrollNext: { be: Пракруціць далей, en: Scroll forward }
  search: { be: 'Пошук: аўтар, назва, год, старонкі', en: 'Search: author, title, year, pages' }
  found: { be: 'Знойдзена: {shown} з {total}', en: 'Showing {shown} of {total}' }
  empty: { be: Такой кнігі на паліцах няма., en: No such book on the shelves. }
  reset: { be: Скінуць, en: Reset }
  genre: { be: Жанр, en: Genre }
  similar: { be: Падобныя кнігі, en: Similar books }
  suggest: { be: 'Магчыма, вам падыдзе', en: You might also like }
  didYouMean: { be: 'Магчыма, вы шукалі', en: Did you mean }
  likeBook: { be: 'як «{title}»', en: 'like “{title}”' }
# How a match is described under a suggested book: «жанр: касьмічная опера»
kinds:
  title: { be: назва, en: title }
  author: { be: аўтар, en: author }
  series: { be: серыя, en: series }
  edition: { be: выданьне, en: edition }
  subject: { be: разьдзел, en: section }
  genre: { be: жанр, en: genre }
  theme: { be: тэма, en: theme }
  mood: { be: настрой, en: mood }
  form: { be: форма, en: form }
  note: { be: у нататцы, en: in the note }
# The vocabulary of the book profiles (src/data/bookProfiles.js): every genre, theme,
# mood and form key with its label in both languages and the words people type for it
# (`aka`, mostly Belarusian; spelling differences such as ь, ў, о/а are ignored by the
# search, so one spelling of a word is enough).
concepts:
  # ----- genres
  space-opera:
    label: { be: касьмічная опера, en: space opera }
    aka: [касмічная опера, космоопера, space opera]
  science-fiction:
    label: { be: навуковая фантастыка, en: science fiction }
    aka: [фантастыка, навуковая фантастыка, фантастычны, фантастычная, фантастычнае, фантаст, нф, sci-fi, scifi, science fiction, sf]
  epic-fantasy:
    label: { be: эпічнае фэнтэзі, en: epic fantasy }
    aka: [фэнтэзі, фентэзі, фэнтази, фэнтэзійны, эпічнае фэнтэзі, гераічнае фэнтэзі, high fantasy, fantasy]
  urban-fantasy:
    label: { be: гарадзкое фэнтэзі, en: urban fantasy }
    aka: [гарадское фэнтэзі, гарадзкое фэнтэзі, магічны рэалізм, urban fantasy]
  ya-fantasy:
    label: { be: падлеткавае фэнтэзі, en: YA fantasy }
    aka: [падлеткавае фэнтэзі, падлеткавая, падлеткам, школа магіі, young adult, ya fantasy]
  dystopia:
    label: { be: антыўтопія, en: dystopia }
    aka: [антыўтопія, антиутопия, дыстопія, утопія, таталітарны раман, dystopia, dystopian]
  post-apocalyptic:
    label: { be: постапакаліпсіс, en: post-apocalyptic }
    aka: [постапакаліпсіс, постапакаліптычны, апакаліпсіс, канец сьвету, пасьля катастрофы, post-apocalyptic, apocalypse]
  cyberpunk:
    label: { be: кіберпанк, en: cyberpunk }
    aka: [кіберпанк, посткіберпанк, тэхнатрылер, technothriller, cyberpunk]
  satire:
    label: { be: сатыра, en: satire }
    aka: [сатыра, сатырычны, сатырычная, гратэск, чорны гумар, памфлет, satire, satirical]
  humour:
    label: { be: гумар, en: humour }
    aka: [гумар, гумарыстычны, гумарыстычная, сьмешнае, смешная, смешны, вясёлае, іранічны, іронія, жарты, комедыя, камедыя, humour, humor, comedy, funny]
  absurd:
    label: { be: абсурд, en: absurdist }
    aka: [абсурд, абсурдны, абсурдная, сюррэалізм, дзіўнае, дзіўная, absurd, surreal]
  historical-fiction:
    label: { be: гістарычны раман, en: historical fiction }
    aka: [гістарычны раман, гістарычная проза, гістарычная аповесьць, historical novel, historical fiction]
  detective:
    label: { be: дэтэктыў, en: detective }
    aka: [дэтэктыў, дэтэктыўны, детектив, крымінал, загадка, расьследаваньне, mystery, detective, crime]
  gothic:
    label: { be: готыка, en: gothic }
    aka: [готыка, гатычны, гатычная, жахі, страшнае, страшная, містыка, містычны, містычная, прывіды, gothic, horror, spooky]
  literary:
    label: { be: сучасная проза, en: literary fiction }
    aka: [сучасная проза, рэалізм, рэалістычны, псіхалагічная проза, драма, літаратурная проза, literary fiction, contemporary]
  classic:
    label: { be: класіка, en: classics }
    aka: [класіка, клясыка, класічны, класічная, класічнае, класік, школьная праграма, classic, classics]
  epic-poetry:
    label: { be: эпічная паэма, en: epic poetry }
    aka: [эпас, эпічная паэма, гекзаметр, антычны эпас, epic poem, epic poetry]
  lyric-poetry:
    label: { be: лірыка, en: lyric poetry }
    aka: [паэзія, вершы, верш, лірыка, лірычны, паэт, паэтка, паэтычны, поэзия, стихи, poetry, poems, verse]
  children:
    label: { be: дзіцячая літаратура, en: children's literature }
    aka: [дзіцячая, дзіцячае, дзецям, для дзяцей, дзіцячыя, дзецям і дарослым, школьнікам, children, kids, childrens]
  fairy-tale:
    label: { be: казка, en: fairy tale }
    aka: [казка, казкі, казачны, прыпавесьць, прыпавесць, парабала, байка, fairy tale, fable, tale, parable]
  drama:
    label: { be: драматургія, en: drama }
    aka: [драматургія, п’еса, пьеса, трагікамедыя, трагедыя, камедыя, тэатр, play, drama, theatre]
  memoir:
    label: { be: мемуары, en: memoir }
    aka: [мемуары, успаміны, дзёньнік, дзённік, аўтабіяграфія, аўтабіяграфічны, memoir, memoirs, diary, autobiography]
  biography:
    label: { be: біяграфія, en: biography }
    aka: [біяграфія, біяграфіі, біяграфічны, партрэты, асобы, постаці, лёсы, biography, biographies, portraits]
  essay:
    label: { be: эсэ, en: essays }
    aka: [эсэ, эсэістыка, публіцыстыка, разважаньні, essays, essay]
  popular-science:
    label: { be: навукова-папулярнае, en: popular science }
    aka: [навукова-папулярнае, навукова-папулярная, навукпоп, папулярная навука, навука для ўсіх, popular science, popsci]
  academic:
    label: { be: навуковае выданьне, en: scholarly work }
    aka: [манаграфія, навуковае, навуковая, навуковы, акадэмічнае, акадэмічны, дасьледаваньне, даследаванне, навукоўцы, monograph, scholarly, academic, study]
  textbook:
    label: { be: падручнік, en: textbook }
    aka: [падручнік, дапаможнік, самавучыцель, саманавучальнік, курс, уводзіны, асновы, textbook, handbook, tutorial, guide, study guide]
  encyclopedia:
    label: { be: энцыклапедыя, en: encyclopedia }
    aka: [энцыклапедыя, энцыклапедычны, даведнік, даведачнае, encyclopedia, reference]
  dictionary:
    label: { be: слоўнік, en: dictionary }
    aka: [слоўнік, слоўнікі, словарь, атлас, тэрміны, тэрміналогія, лексікон, dictionary, glossary]
  illustrated-history:
    label: { be: ілюстраваная гісторыя, en: illustrated history }
    aka: [ілюстраваная гісторыя, гісторыя ў малюнках, маляваная гісторыя, illustrated history]
  art-album:
    label: { be: альбом, en: art book }
    aka: [альбом, ілюстраваны, ілюстраванае, ілюстрацыі, малюнкі, графіка, выявы, падарункавае, падарункавая, art book, illustrated, artbook]
  photobook:
    label: { be: фотаальбом, en: photobook }
    aka: [фотаальбом, фота, фотаздымкі, здымкі, фатаграфіі, паштоўкі, photobook, photos, photography]
  business:
    label: { be: бізнес-літаратура, en: business }
    aka: [бізнес, бізнэс, менеджмент, кіраваньне, кіраванне, маркетынг, кампанія, карпаратыўнае, business, management, marketing]
  religious:
    label: { be: рэлігійны тэкст, en: scripture }
    aka: [біблія, рэлігія, рэлігійны, рэлігійная, сьвятое пісьмо, святое пісьмо, пісаньне, запавет, scripture, bible, religious]
  bestiary:
    label: { be: бестыярый, en: bestiary }
    aka: [бестыярый, бестыярыум, нячысьцікі, нячысцікі, нечысьць, нечысць, істоты, пачвары, bestiary, creatures]
  legends:
    label: { be: легенды і паданьні, en: legends }
    aka: [легенды, легенда, паданьні, паданні, паданьне, міфы, міф, міфалогія, мифы, legends, myths, mythology, folk tales]
  guidebook:
    label: { be: падарожны даведнік, en: travel guide }
    aka: [даведнік, падарожны, турыстычны, турыстычная, путеводитель, guidebook, travel guide]

  # ----- themes
  space:
    label: { be: космас, en: space }
    aka: [космас, касмічны, касмічная, касмічнае, касмічныя, галактыка, галактычны, галактычная, зоркі, зорны, зорная, зорнае, міжзорны, сусьвет, сусвет, планета, планеты, астранаўт, астранаўты, касманаўт, ракета, зоркалёт, космос, вселенная, space, galaxy, stars, universe, planet, spaceship, starship]
  mars:
    label: { be: Марс, en: Mars }
    aka: [марс, марсіянскі, марсіянская, марсіянін, mars, martian]
  far-future:
    label: { be: далёкая будучыня, en: far future }
    aka: [будучыня, будучыні, будучыню, далёкая будучыня, футурызм, футуралогія, будущее, future, futuristic]
  aliens:
    label: { be: іншапланецяне, en: aliens }
    aka: [іншапланецяне, іншапланецянін, іншапланетны, іншапланетная, чужыя, кантакт, першы кантакт, пазаземны, пазаземная, цывілізацыі, инопланетяне, aliens, alien, first contact, extraterrestrial]
  ai:
    label: { be: штучны інтэлект, en: artificial intelligence }
    aka: [штучны інтэлект, шы, шi, нейрасеткі, нейрасетка, нейронныя сеткі, моўныя мадэлі, мадэлі, машыннае навучаньне, машыннае навучанне, трансформер, трансформеры, робаты, робат, ai, artificial intelligence, machine learning, neural, llm, gpt, robots]
  time:
    label: { be: час, en: time }
    aka: [час, часу, падарожжы ў часе, часавыя петлі, time, time travel, time loop]
  magic:
    label: { be: магія, en: magic }
    aka: [магія, магічны, магічная, магічнае, чараўніцтва, чары, чарадзейства, чараўнік, чараўніца, вядзьмарка, вядзьмар, ведзьма, маг, магі, заклёны, magic, wizard, witch, sorcery, spells]
  monsters:
    label: { be: пачвары і духі, en: monsters and spirits }
    aka: [пачвары, пачвара, монстры, монстр, істоты, істота, нячысьцікі, нячысцікі, нечысьць, нечысць, дэманы, духі, дух, прывіды, прывід, ваўкалакі, ваўкалак, русалка, русалкі, лясун, вампір, дракон, monsters, creatures, spirits, ghosts, vampire, dragon]
  middle-earth:
    label: { be: Сярэдзем’е, en: Middle-earth }
    aka: [сярэдзем’е, міжзем’е, middle-earth, middle earth, шыр, мордар, гобіт, гобіты, хобіт, хобіты, фрода, гэндальф, пярсьцёнак, пярсцёнак, кольцо, эльфы, оркі]
  fantasy-races:
    label: { be: эльфы і гномы, en: elves and dwarves }
    aka: [эльфы, эльф, эльфійскі, гномы, гном, краснолюды, дрыяды, elves, elf, dwarves, dwarf]
  school:
    label: { be: школа, en: school }
    aka: [школа, школьны, школьная, вучні, вучань, настаўнік, настаўніца, хогвартс, гогвартс, школа магіі, school, hogwarts, teacher, students]
  coming-of-age:
    label: { be: сталеньне, en: coming of age }
    aka: [сталеньне, сталенне, дарастаньне, юнацтва, падлетак, падлеткі, маладосьць, маладосць, coming of age, growing up, youth]
  friendship:
    label: { be: сяброўства, en: friendship }
    aka: [сяброўства, сябры, сябра, сяброўка, дружба, friendship, friends]
  childhood:
    label: { be: дзяцінства, en: childhood }
    aka: [дзяцінства, дзеці, дзіця, хлопчык, дзяўчынка, childhood, children, child, boy, girl]
  quest:
    label: { be: падарожжа, en: journey }
    aka: [падарожжа, падарожжы, вандроўка, вандроўкі, шлях, дарога, пошукі, quest, journey, road, adventure, прыгоды, прыгодніцкі]
  travel:
    label: { be: турызм, en: travel }
    aka: [турызм, турыстычны, турыстычная, паездка, выходныя, экскурсія, маршрут, travel, tourism, trip, weekend]
  war:
    label: { be: вайна, en: war }
    aka: [вайна, война, войны, ваенны, ваенная, ваеннае, франт, бітва, бітвы, аблога, армія, войска, салдаты, war, battle, army, military, soldiers]
  ww2:
    label: { be: Другая сусьветная, en: World War II }
    aka: [другая сусьветная, другая сусветная, акупацыя, немцы, паліцаі, партызаны, '1941', '1945', вялікая айчынная, wwii, ww2, world war]
  soviet:
    label: { be: савецкі час, en: Soviet era }
    aka: [савецкі, савецкая, савецкае, саветы, ссср, калектывізацыя, калгас, бсср, сталін, савецкая ўлада, soviet, ussr, stalin]
  totalitarianism:
    label: { be: таталітарызм, en: totalitarianism }
    aka: [таталітарызм, таталітарны, таталітарная, дыктатура, дыктатар, рэжым, улада, прапаганда, цэнзура, несвабода, рэпрэсіі, totalitarian, dictatorship, regime, propaganda, oppression]
  surveillance:
    label: { be: кантроль і сачэньне, en: surveillance }
    aka: [сачэньне, сачэнне, кантроль, нагляд, вялікі брат, surveillance, control, big brother]
  politics:
    label: { be: палітыка, en: politics }
    aka: [палітыка, палітычны, палітычная, дзяржава, дзяржаўны, улада, інстытуцыі, грамадзтва, грамадства, politics, political, state, society]
  economics:
    label: { be: эканоміка, en: economics }
    aka: [эканоміка, эканамічны, эканамічная, багацьце, багацце, беднасьць, беднасць, грошы, economics, economy, wealth, poverty, nations]
  philosophy:
    label: { be: філасофія, en: philosophy }
    aka: [філасофія, філязофія, філасофскі, філасофская, філасофскае, думка, мысьленьне, мысленне, ідэі, сьветапогляд, светапогляд, philosophy, philosophical, thought, ideas, worldview]
  religion:
    label: { be: рэлігія, en: religion }
    aka: [рэлігія, рэлігійны, рэлігійная, бог, вера, царква, касьцёл, хрысьціянства, хрысціянства, біблейскі, біблейская, езуіт, езуіты, religion, faith, church, god, christian, jesuit]
  gods:
    label: { be: багі, en: gods }
    aka: [багі, бог, багіня, боства, пантэон, gods, deities, goddess]
  humanity:
    label: { be: чалавечнасьць, en: humanity }
    aka: [чалавечнасьць, чалавечнасць, чалавек, чалавецтва, віна, адказнасьць, адказнасць, мараль, этыка, сумленьне, сумленне, humanity, guilt, responsibility, ethics, conscience]
  violence:
    label: { be: гвалт, en: violence }
    aka: [гвалт, насільле, насілле, помста, жорсткасьць, жорсткасць, violence, revenge, cruelty]
  crime:
    label: { be: злачынства, en: crime }
    aka: [злачынства, злачынствы, злачынец, крымінал, турма, зьняволеньне, зняволенне, вязьніца, crime, prison, criminal]
  belarus:
    label: { be: Беларусь, en: Belarus }
    aka: [беларусь, беларусі, беларускі, беларуская, беларускае, беларускія, беларусы, беларуска, беларусаў, айчына, бацькаўшчына, радзіма, belarus, belarusian, belarusians]
  belarusian-mythology:
    label: { be: беларуская міфалогія, en: Belarusian mythology }
    aka: [беларуская міфалогія, міфалогія, міфы, міф, міфалагічны, міфалагічная, паганства, язычніцтва, багі, духі, папараць-кветка, mythology, myths, mythological, pagan]
  folklore:
    label: { be: фальклор, en: folklore }
    aka: [фальклор, фальклёр, фальклорны, фальклорная, фалькларыст, народны, народная, народнае, народныя, абрад, абрады, абрадавы, звычаі, традыцыі, традыцыйны, традыцыйная, гаворкі, гаворка, дыялекты, дыялект, этнаграфія, folklore, folk, traditional, rites, customs, dialects]
  gdl:
    label: { be: Вялікае Княства Літоўскае, en: Grand Duchy of Lithuania }
    aka: [вкл, вялікае княства, вялікае княства літоўскае, княства, літоўскае, сярэднявечча, сярэднявечны, сярэднявечная, князі, князь, вялікі князь, рэч паспалітая, grand duchy, lithuania, medieval, middle ages]
  maps:
    label: { be: мапы, en: maps }
    aka: [мапы, мапа, карты, карта, картаграфія, картограф, картографы, геаграфія, атлас, maps, map, cartography, atlas]
  coins:
    label: { be: манеты, en: coins }
    aka: [манеты, манета, нумізматыка, нумізмат, грошы, грашовы, монеты, coins, coin, numismatics, money, currency]
  uprising-1863:
    label: { be: паўстаньне 1863 году, en: uprising of 1863 }
    aka: [паўстаньне, паўстанне, паўстанцы, паўстанец, '1863', каліноўскі, касьцюшка, касцюшка, uprising, insurrection, kalinouski, kosciuszko]
  19th-century:
    label: { be: XIX стагодзьдзе, en: 19th century }
    aka: [xix, xix стагодзьдзе, xix стагоддзе, дзевятнаццатае стагодзьдзе, 1800-я, nineteenth century, 19th century]
  1920s:
    label: { be: 1920-я гады, en: the 1920s }
    aka: [1920-я, дваццатыя, дваццатыя гады, нэп, маладняк, узвышша, 1920s, twenties]
  bnr:
    label: { be: БНР і незалежнасьць, en: BNR and independence }
    aka: [бнр, народная рэспубліка, незалежнасьць, незалежнасць, дзяржаўнасьць, дзяржаўнасць, свабода, воля, '1918', independence, freedom, statehood, liberty]
  protests-2020:
    label: { be: пратэсты 2020 году, en: protests of 2020 }
    aka: ['2020', пратэсты, пратэст, пратэсны, маршы, марш, плякаты, плакаты, рэвалюцыя, protest, protests, revolution]
  flag:
    label: { be: сьцяг, en: flag }
    aka: [сьцяг, сцяг, сьцягі, бел-чырвона-белы, бчб, штандар, сімволіка, сімвал, герб, пагоня, flag, banner, symbols]
  polesia:
    label: { be: Палесьсе, en: Polesia }
    aka: [палесьсе, палессе, палескі, палеская, палескае, балота, балоты, балотны, palesse, polesia, polesie, marsh, swamp]
  minsk:
    label: { be: Мінск, en: Minsk }
    aka: [мінск, менск, мінскі, мінская, мінскае, мінскія, сталіца, minsk, capital]
  cities:
    label: { be: гарады, en: cities }
    aka: [гарады, горад, гарадскі, гарадская, гарадское, мястэчка, мястэчкі, полацк, полацак, гродна, горадня, магілёў, віцебск, вільня, cities, city, towns, town]
  village:
    label: { be: вёска, en: village }
    aka: [вёска, вёскі, вясковы, вясковая, вясковае, хата, хутар, гаспадарка, сяляне, сялянскі, village, rural, countryside, peasants]
  love:
    label: { be: каханьне, en: love }
    aka: [каханьне, каханне, любоў, закаханыя, раманс, романтика, love, romance, romantic]
  family:
    label: { be: сям’я, en: family }
    aka: [сям’я, сямейны, сямейная, бацька, маці, сын, дачка, дзед, бабуля, пакаленьні, пакаленні, род, family, father, mother, son, daughter, generations]
  nobility:
    label: { be: шляхта, en: gentry }
    aka: [шляхта, шляхціц, шляхцянка, шляхецкі, шляхецкая, маёнтак, палац, магнаты, арыстакратыя, gentry, nobility, estate, aristocracy, manor]
  death:
    label: { be: сьмерць, en: death }
    aka: [сьмерць, смерць, сьмяротны, памерці, страта, жалоба, death, dying, mortality, loss]
  destiny:
    label: { be: лёс, en: destiny }
    aka: [лёс, лёсы, наканаваньне, наканаванне, прызначэньне, прызначэнне, прароцтва, destiny, fate, prophecy]
  language:
    label: { be: мова, en: language }
    aka: [мова, мовы, беларуская мова, моўны, моўная, лексіка, фразеалогія, словы, слова, мовазнаўства, лінгвістыка, лінгвістычны, правапіс, тарашкевіца, наркамаўка, граматыка, пераклад, language, linguistics, words, vocabulary, grammar, translation]
  literature:
    label: { be: літаратура, en: literature }
    aka: [літаратура, літаратурны, літаратурная, пісьменьнікі, пісьменнікі, пісьменьнік, паэты, паэт, літаратуразнаўства, literature, writers, poets, literary]
  computers:
    label: { be: кампутары і праграмаваньне, en: computers and programming }
    aka: [it, айці, кампутар, кампутары, камп’ютар, камп’ютэр, кампутарны, працэсар, код, кодзінг, праграмаваньне, праграмаванне, праграміст, праграмісты, праграмы, софт, інфарматыка, алгарытмы, альгарытмы, структуры даных, базы даных, computer, computers, programming, code, software, computer science, algorithms, cs, developers]
  software-architecture:
    label: { be: архітэктура праграмаў, en: software architecture }
    aka: [архітэктура, праектаваньне, праектаванне, дызайн сістэм, чысты код, solid, architecture, design, clean code, patterns]
  devrel:
    label: { be: DevRel, en: developer relations }
    aka: [devrel, developer relations, дэўрэл, распрацоўнікі, распрацоўшчыкі, супольнасьць, супольнасць, супольнасьць распрацоўнікаў, адвакацыя, developer marketing, community, developers, advocacy]
  hacking:
    label: { be: хакеры і бясьпека, en: hacking and security }
    aka: [хакер, хакеры, хакерства, узлом, бясьпека, бяспека, кібербясьпека, сацыяльная інжынерыя, hacker, hacking, security, cybersecurity, social engineering]
  management:
    label: { be: кіраваньне, en: management }
    aka: [кіраваньне, кіраванне, менеджмент, менеджэр, завод, вытворчасьць, вытворчасць, эфектыўнасьць, эфектыўнасць, тэорыя абмежаваньняў, каманда, кампанія, management, production, lean, team, company, efficiency]
  physics:
    label: { be: фізіка, en: physics }
    aka: [фізіка, фізік, фізічны, касмалогія, чорныя дзіркі, тэорыя адноснасьці, тэорыя адноснасці, вялікі выбух, квантавы, physics, cosmology, black holes, relativity, big bang, quantum]
  science:
    label: { be: навука, en: science }
    aka: [навука, навуковы, навуковая, навуковае, вучоны, вучоныя, дасьледаваньні, даследаванні, тэхналогіі, science, scientist, scientific, technology]
  health:
    label: { be: здароўе, en: health }
    aka: [здароўе, здаровы, здаровае, харчаваньне, харчаванне, дыета, звычкі, лад жыцьця, лад жыцця, медыцына, лекар, цела, сон, health, nutrition, diet, habits, lifestyle, medicine, wellbeing]
  food:
    label: { be: ежа, en: food }
    aka: [ежа, есьці, есці, кухня, стравы, прадукты, гатаваньне, гатаванне, food, eating, cooking, kitchen]
  survival:
    label: { be: выжываньне, en: survival }
    aka: [выжываньне, выжыванне, выжыць, выжывае, адзін, самота, катастрофа, survival, survive, alone, castaway]
  art:
    label: { be: мастацтва, en: art }
    aka: [мастацтва, мастак, мастакі, мастачка, жывапіс, графіка, гравюры, гравюра, малюнкі, малюнак, ілюстрацыі, ілюстратар, выяўленчае, дызайн, art, artist, painting, engravings, drawings, illustrations, design]
  music:
    label: { be: музыка, en: music }
    aka: [музыка, музычны, песьні, песні, песьня, гурт, рок, фолк, альбом, канцэрт, music, songs, song, band, rock, folk music]
  women:
    label: { be: жанчыны, en: women }
    aka: [жанчыны, жанчына, жаночы, жаночая, гераіні, гераіня, беларускі, аўтаркі, фемінізм, women, woman, heroines, feminist]
  exile:
    label: { be: эміграцыя, en: exile }
    aka: [эміграцыя, эмігранты, эмігрант, выгнаньне, выгнанне, замежжа, дыяспара, уцёкі, exile, emigration, diaspora, emigre]
  underground:
    label: { be: андэграўнд і Адраджэньне, en: underground and revival }
    aka: [андэграўнд, андэграунд, нефармалы, нефармальны, 1980-я, 1990-я, перабудова, адраджэньне, адраджэнне, васьмідзясятыя, дзевяностыя, underground, 1990s, 1980s, revival, perestroika]
  everyday:
    label: { be: штодзённасьць, en: everyday life }
    aka: [штодзённасьць, штодзённасць, штодзённае, будзённасьць, будзённасць, побыт, рэчы, дробязі, звычайнае жыцьцё, everyday, daily life, objects, ordinary]
  animals:
    label: { be: жывёлы, en: animals }
    aka: [жывёлы, жывёла, зьвяры, звяры, сьвіньні, свінні, коні, конь, ферма, animals, animal, farm, beasts]
  colonisation:
    label: { be: каланізацыя, en: colonisation }
    aka: [каланізацыя, калонія, калоніі, пасяленцы, засяленьне, засяленне, экспедыцыя, colonisation, colonization, colony, settlers, expedition]
  clones:
    label: { be: клоны, en: clones }
    aka: [клоны, клон, кланаваньне, бесьсьмяротнасьць, бессмяротнасць, clones, clone, immortality]
  greek:
    label: { be: антычнасьць, en: antiquity }
    aka: [антычнасьць, антычнасць, антычны, антычная, грэцыя, грэцкі, грэкі, старажытная грэцыя, троя, траянская вайна, рым, рымскі, старажытны, старажытная, antiquity, ancient, greece, greek, troy, trojan, rome, roman]
  norse:
    label: { be: паўночная міфалогія, en: Norse mythology }
    aka: [скандынаўскі, скандынаўская, скандынавія, вікінгі, вікінг, паўночная міфалогія, мідгард, норманы, norse, viking, vikings, scandinavian, midgard]
  china:
    label: { be: Кітай, en: China }
    aka: [кітай, кітайскі, кітайская, кітайцы, китай, china, chinese]
  poland:
    label: { be: Польшча, en: Poland }
    aka: [польшча, польскі, польская, польскае, палякі, варшава, кракаў, беласток, падляшша, падлясьсе, poland, polish, warsaw, krakow, bialystok, podlasie]
  russia:
    label: { be: Расея, en: Russia }
    aka: [расея, расія, расейскі, расейская, расійская, расійскі, імперыя, імперскі, масква, пецярбург, russia, russian, empire, moscow]
  nature:
    label: { be: прырода, en: nature }
    aka: [прырода, лес, лясы, лясны, лясная, рэкі, рака, крыніцы, крыніца, возера, расьліны, расліны, дрэвы, грыбы, зямля, сонца, nature, forest, rivers, plants, trees, lake, earth]
  heroes:
    label: { be: героі, en: heroes }
    aka: [героі, герой, гераізм, подзьвіг, подзвіг, змагары, змагар, змаганьне, змаганне, heroes, hero, heroism, fighters]
  sea:
    label: { be: мора, en: the sea }
    aka: [мора, марскі, марская, плаваньне, плаванне, караблі, карабель, выспа, астравы, sea, voyage, ship, island]
  desert:
    label: { be: пустыня, en: desert }
    aka: [пустыня, пустэльня, пяскі, пясок, спецыя, desert, sand, spice]
  history:
    label: { be: гісторыя, en: history }
    aka: [гісторыя, гістарычны, гістарычная, гістарычнае, гістарычныя, гісторык, гісторыкі, мінулае, мінуўшчына, даўніна, стагодзьдзе, стагоддзе, стагодзьдзі, история, history, historical, past, century]

  # ----- moods
  epic:
    label: { be: эпічны, en: epic }
    aka: [эпічны, эпічная, эпічнае, маштабны, маштабная, велічны, велічная, эпапея, сага, epic, grand, sweeping, saga]
  dark:
    label: { be: змрочны, en: dark }
    aka: [змрочны, змрочная, змрочнае, цёмны, цёмная, цяжкі, цяжкая, жорсткі, жорсткая, суровы, суровая, dark, grim, bleak, heavy, harsh]
  light:
    label: { be: лёгкі, en: light }
    aka: [лёгкі, лёгкая, лёгкае, лагодны, лагодная, для адпачынку, адпачыць, разгрузка, просты, простая, простае, light, easy, gentle, cozy, simple]
  funny:
    label: { be: сьмешны, en: funny }
    aka: [сьмешны, смешны, сьмешная, смешная, вясёлы, вясёлая, вясёлае, дасьціпны, дасціпны, жартаўлівы, жартаўлівая, пасьмяяцца, funny, witty, playful, hilarious, laugh]
  lyrical:
    label: { be: лірычны, en: lyrical }
    aka: [лірычны, лірычная, лірычнае, пяшчотны, пяшчотная, паэтычны, паэтычная, шчымлівы, шчымлівая, настальгічны, настальгічная, lyrical, tender, poetic, nostalgic, wistful]
  tense:
    label: { be: напружаны, en: gripping }
    aka: [напружаны, напружаная, напружанае, дынамічны, дынамічная, захапляльны, захапляльная, захапляльнае, трымае, трылер, прыгоды, прыгодніцкі, прыгодніцкая, экшн, tense, gripping, thrilling, page-turner, thriller, action, adventure]
  thoughtful:
    label: { be: задумлівы, en: thoughtful }
    aka: [задумлівы, задумлівая, задумлівае, філасофскі, глыбокі, глыбокая, глыбокае, разважлівы, разважлівая, паразважаць, падумаць, разумны, разумная, сур’ёзны, сур’ёзная, сур’ёзнае, thoughtful, reflective, contemplative, deep, serious, cerebral]
  tragic:
    label: { be: трагічны, en: tragic }
    aka: [трагічны, трагічная, трагічнае, сумны, сумная, сумнае, балючы, балючая, балючае, горкі, горкая, сьлёзы, слёзы, tragic, sad, painful, sorrowful, heartbreaking]
  eerie:
    label: { be: вусьцішны, en: eerie }
    aka: [вусьцішны, вусцішны, вусьцішная, жудасны, жудасная, страшны, страшная, страшнае, містычны, містычная, таямнічы, таямнічая, таямнічае, прывідны, eerie, spooky, mysterious, uncanny, creepy, haunting]
  warm:
    label: { be: цёплы, en: warm }
    aka: [цёплы, цёплая, цёплае, утульны, утульная, утульнае, душэўны, душэўная, шчыры, шчырая, добры, добрая, добрае, warm, heartfelt, homely, kind, comforting]
  inspiring:
    label: { be: натхняльны, en: inspiring }
    aka: [натхняльны, натхняльная, натхняльнае, натхняе, аптымістычны, аптымістычная, надзея, матывацыя, матывуе, inspiring, uplifting, hopeful, motivating, optimistic]

  # ----- forms
  novel:
    label: { be: раман, en: novel }
    aka: [раман, роман, novel, проза, prose, fiction]
  novella:
    label: { be: аповесьць, en: novella }
    aka: [аповесьць, аповесць, повесть, novella]
  stories:
    label: { be: апавяданьні, en: short stories }
    aka: [апавяданьні, апавяданні, апавяданьне, апавяданне, зборнік апавяданьняў, зборнік апавяданняў, навелы, навела, рассказы, гісторыі, short stories, stories, novellas, collection]
  poems:
    label: { be: зборнік вершаў, en: poetry collection }
    aka: [зборнік вершаў, вершы, паэзія, кніга вершаў, зборнік паэзіі, стихи, poems, poetry collection]
  poem:
    label: { be: паэма, en: long poem }
    aka: [паэма, паэмы, поэма, эпас, poem, epic poem]
  play:
    label: { be: п’еса, en: play }
    aka: [п’еса, п’есы, пьеса, драма, трагікамедыя, play, plays, drama]
  essays:
    label: { be: зборнік эсэ, en: essay collection }
    aka: [эсэ, зборнік эсэ, артыкулы, essays, articles]
  diary:
    label: { be: дзёньнік, en: diary }
    aka: [дзёньнік, дзённік, дневник, запісы, нататкі, diary, journal, notes]
  nonfiction:
    label: { be: нон-фікшн, en: non-fiction }
    aka: [нон-фікшн, нонфікшн, нехудожняя, нехудожняе, дакументальнае, дакументальная, non-fiction, nonfiction]
  handbook:
    label: { be: дапаможнік, en: handbook }
    aka: [дапаможнік, падручнік, самавучыцель, саманавучальнік, кансьпект, канспект, інструкцыя, handbook, textbook, guide, manual, study guide]
  reference:
    label: { be: даведачнае выданьне, en: reference work }
    aka: [даведнік, даведачнае, даведачная, слоўнік, энцыклапедыя, атлас, reference, dictionary, encyclopedia]
  album:
    label: { be: альбом, en: album }
    aka: [альбом, альбомы, фотаальбом, кніга-альбом, вялікі фармат, album, coffee table book]
  anthology:
    label: { be: анталогія, en: anthology }
    aka: [анталогія, хрэстаматыя, зборнік, зборнік тэкстаў, зборнік артыкулаў, anthology, collection, reader]
  zine:
    label: { be: зін, en: zine }
    aka: [зін, зіны, арт-зборнік, самвыдат, самиздат, zine, fanzine, self-published]
  sacred-text:
    label: { be: сьвяшчэнны тэкст, en: sacred text }
    aka: [сьвятое пісьмо, святое пісьмо, пісаньне, пісанне, біблія, евангельле, евангелле, scripture, bible, gospel]
# People and publishers, transliterated for the English page
details:
  narnia-magicians-nephew:
    author: { be: К. С. Льюіс, en: C. S. Lewis }
    translator: { be: Надзея Кім, en: Nadzeya Kim }
    publisher: { be: '«Пазытыў-цэнтар», Мінск', en: 'Pazytyu-Centre, Minsk' }
  lotr-two-towers:
    author: { be: Дж. Р. Р. Толкін, en: J. R. R. Tolkien }
    translator: { be: 'Дзьмітры Магілеўцаў, Крысьціна Курчанкова', en: 'Dzmitry Mahileutsau, Krystsina Kurchankova' }
    publisher: { be: Мінск, en: Minsk }
  lotr-return-of-the-king:
    author: { be: Дж. Р. Р. Толкін, en: J. R. R. Tolkien }
    translator: { be: 'Дзьмітры Магілеўцаў, Крысьціна Курчанкова', en: 'Dzmitry Mahileutsau, Krystsina Kurchankova' }
    publisher: { be: Мінск, en: Minsk }
  bielaruski-klasycny-pravapis:
    author: { be: 'Юрась Бушлякоў, Вінцук Вячорка, Зьміцер Санько, Зьміцер Саўка', en: 'Yuras Bushliakou, Vintsuk Viachorka, Zmitser Sanko, Zmitser Sauka' }
    publisher: { be: 'Вільня — Менск', en: 'Vilnius — Minsk' }
---

<!-- be -->

# Мае кнігі {#intro}

Тут дзьве паліцы. На першай — кнігі, якіх у мяне яшчэ няма і якія я шукаю. На другой — усё, што ўжо стаіць дома.

# Шукаю {#wanted}

Ёсьць кнігі, якія не купіш у краме: наклад даўно разышоўся, перавыданьня няма, і застаецца толькі паляваць на іх па букіністах і чужых паліцах. Калі нейкая з гэтых кніг стаіць у вас і вы гатовыя зь ёй разьвітацца — [напішыце мне](/contacts), набуду з радасьцю.

## Хронікі Нарніі. Пляменнік чараўніка {#narnia-magicians-nephew}

Кніга пра тое, як паўстала Нарнія і як у ёй упершыню апынуліся людзі, — першая частка «Хронік» па-беларуску. Пераклала Надзея Кім, вокладку стварыў графік Раман Сустаў, а ўнутры — класічныя ілюстрацыі Паўліны Бэйнс зь першага ангельскага выданьня. Выйшла ў серыі «Добрая кніга». Тры наступныя часткі ўжо стаяць на паліцы — бракуе якраз пачатку.

## Уладар Пярсьцёнкаў. Дзьве вежы {#lotr-two-towers}

Другі том першага беларускага перакладу трылогіі — класічным правапісам, з малюнкамі К. Шэмяк і мапамі Т. Яфімавай. Выйшаў у Мінску накладам усяго 500 асобнікаў, таму знайсьці яго цяпер — квэст, варты самога Толкіна. Першы том у мяне ёсьць.

## Уладар Пярсьцёнкаў. Вяртаньне караля {#lotr-return-of-the-king}

Заключны том таго ж выданьня: той самы пераклад Дзьмітрыя Магілеўцава і Крысьціны Курчанковай, тыя самыя 500 асобнікаў. Без яго трылогія на паліцы так і застаецца недачытанай.

## Беларускі клясычны правапіс. Збор правілаў. Сучасная нармалізацыя {#bielaruski-klasycny-pravapis}

Папяровае выданьне нармалізаванага класічнага беларускага правапісу — збор правілаў, які падрыхтавалі Юрась Бушлякоў, Вінцук Вячорка, Зьміцер Санько і Зьміцер Саўка. Выйшла ў 2005 годзе і прадавалася праз Knihi.net; цяпер у звычайным продажы кніга практычна не сустракаецца і фактычна зьяўляецца букіністычнай рэдкасьцю. Дакладны наклад пакуль невядомы. А калі хтосьці захоча раздрукаваць яе самастойна і падарыць — будзе крута.

# Мая бібліятэка {#library}

<!-- en -->

# My books {#intro}

Two shelves live here. The first holds the books I don't have yet and am looking for. The second is everything that already stands at home.

# Wanted {#wanted}

Some books can't be bought in a shop: the print run sold out long ago, there is no reissue, and all that is left is to hunt for them in second-hand stores and on other people's shelves. If one of these is sitting on your shelf and you are ready to part with it — [drop me a line](/contacts), I'll gladly buy it.

## The Chronicles of Narnia. The Magician's Nephew {#narnia-magicians-nephew}

The story of how Narnia came to be and how humans first found their way there — the first part of the Chronicles in Belarusian. Translated by Nadzeya Kim, with a cover by graphic artist Raman Sustau and Pauline Baynes's classic illustrations from the first English edition inside. Published in the «Dobraja Kniha» series. The next three parts are already on my shelf — it is the beginning that is missing.

## The Lord of the Rings. The Two Towers {#lotr-two-towers}

The second volume of the first Belarusian translation of the trilogy — in the classical orthography, with drawings by K. Shemiak and maps by T. Yafimava. Printed in Minsk in a run of just 500 copies, which makes finding one today a quest worthy of Tolkien himself. Volume one I already have.

## The Lord of the Rings. The Return of the King {#lotr-return-of-the-king}

The closing volume of the same edition: the same translation by Dzmitry Mahileutsau and Krystsina Kurchankova, the same 500 copies. Without it the trilogy on the shelf stays unfinished.

## Belarusian Classical Orthography. A Set of Rules. Modern Normalisation {#bielaruski-klasycny-pravapis}

The paper edition of the normalised classical Belarusian orthography — the set of rules drawn up by Yuras Bushliakou, Vintsuk Viachorka, Zmitser Sanko and Zmitser Sauka. It came out in 2005 and was sold through Knihi.net; today it hardly ever turns up in regular sale and is, in effect, a second-hand rarity. The exact print run is still unknown. And if someone feels like printing a copy themselves and giving it as a present — that would be great.

# My library {#library}


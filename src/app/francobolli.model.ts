export class Francobolli {
  index?: number;
  timestamp?: number;

  imageSrc: string;
  author: string;
  issuedCountry: string;

  issueYear?: number;
  description?: string;
  cost?: number | string;
  purchaseDate?: string;

  regNum?: string;
  regNum2?: string;

  widthRatio?: number;
  heightRatio?: number;

  patria?: string;
  __KEY__?: string;
  stampKey?: string;

  constructor(imageSrc?: string, author?: string, country?: string ) {
    this.imageSrc = imageSrc ?? ''
    this.author = author ?? ''
    this.issuedCountry= country ?? ''
  }

  updateFieldsFromImport(importF: Francobolli): void {
    if ( importF.author ) this.author = importF.author
    if ( importF.description ) this.description = importF.description
    if ( importF.issueYear ) this.issueYear = importF.issueYear
    if ( importF.issuedCountry ) this.issuedCountry = importF.issuedCountry
    if ( importF.cost ) this.cost = importF.cost
    if ( importF.purchaseDate ) this.purchaseDate = importF.purchaseDate
    if ( importF.regNum ) this.regNum = importF.regNum
    if ( importF.regNum2 ) this.regNum2 = importF.regNum2
  }

  clear() {
    this.imageSrc = ''
    this.author = ''
    this.description = undefined
    this.issueYear = undefined
  }

  removeEmptyProperties() {
    for (const key in this) {
      if(!this[key]) delete this[key]
    }
  }
}

export interface AssetsImageList {
  folder: string;
  images: string[];
}

export interface Author {
  name: string;
  alterName?: string;
  country: string;
}
export interface CountriesAndContinent {
  continent: string;
  countries: string[];
  authors?: string[];
}
export interface CountryAndContinent {
  id: number;
  continent: string;
  country: string;
  authors?: string[];
}

export interface ContinentCountryAuthors {
  continent: string;
  data: CountryAuthors[];
  continentStampsTotal?: number;
  continentAuthorsTotal?: number;
}

export interface CountryAuthors {
  country: string;
  authorAmount: {
    author: string;
    amount: number;
  }[];
  stampsTotal: number;
}
export const levelFieldNames:  { name: string; count: string}[] = [
  { name: 'continent', count: 'continentStampsTotal'},
  { name: 'country', count: 'stampsTotal'},
  { name: 'author', count: 'amount'},
]

export const CountriesByContinent: CountriesAndContinent[] = [
  {
    continent: "Русские",
    countries: ['Россия', 'СССР'],
    authors: ['Пушкин', 'Лермонтов', 'Грибоедов', 'Достоевский', 'Маяковский', 'Есенин']
  },
  {
    continent: "Европа",
    countries: [
      "Италия","Великобритания","Германия","ГДР", "Испания","Австрия","Акротири","Албания","Андорра","Белоруссия","Бельгия","Болгария","Босния и Герцеговина",
      "Ватикан","Венгрия","Гернси","Гибралтар","Греция","Дания","Декелия","Джерси",
      "Ирландия", "Исландия","Кипр","Косово","Латвия","Литва","Лихтенштейн","Люксембург","Македония","Мальта","Молдова",
      "Монако","Нидерланды","Норвегия","Остров Мэн","Польша","Португалия","Румыния","Сан-Марино","Сербия","Словакия","Словения","Украина",
      "Фарерские острова","Финляндия","Франция","Хорватия","Черногория","Чехия","Швейцария","Швеция","Шпицберген","Эстония","Югославия","Ян-Майен"
    ],
    authors: ['Данте','Петрарка','Oscar Wilde']
  },
  { continent: "Азия",
    countries: [
      "Афганистан","Бангладеш","Британская территория в Индийском океане","Бруней","Бутан","Восточный Тимор","Вьетнам","Гонконг","Индия",
      "Индонезия","Казахстан","Камбоджа","Киргизия","Китай","Лаос","Макао","Малайзия","Мальдивы","Монголия","Мьянма","Непал","Пакистан",
      "Папуа - Новая Гвинея","Северная Корея","Сингапур","Таджикистан","Таиланд","Тайвань","Туркменистан","Узбекистан","Филиппины",
      "Шри-Ланка","Южная Корея","Япония"
    ]
  },
  {
    continent: "Ближний Восток",
    countries: [
      "Азербайджан", "Армения", "Бахрейн", "Грузия", "Израиль", "Иордания", "Ирак", "Иран", "Йемен", "Катар", "Кувейт", "Ливан",
      "Объединенные Арабские Эмираты", "Оман", "Саудовская Аравия", "Сирия", "Турция"
    ]
  },
  {
    continent: "Северная Америка",
    countries: [
      "США", "Бермудские Острова", "Гренландия", "Канада", "Мексика", "Остров Клиппертон", "Сен-Пьер и Микелон"
    ]
  },
  { continent: "Африка",
    countries: [
      "Алжир","Ангола","Бенин","Ботсвана","Буркина-Фасо","Бурунди","Габон","Гамбия","Гана","Гвинея","Гвинея-Бисау","Конго","Джибути",
      "Египет","Замбия","Западная Сахара","Зимбабве","Кабо-Верде","Камерун","Кения","Коморы","Кот-д\'Ивуар","Лесото","Либерия","Ливия",
      "Маврикий","Мавритания","Мадагаскар","Майотта","Малави","Мали","Марокко","Мозамбик","Намибия","Нигер","Нигерия",
      "Остров Святой Елены, Остров Вознесения, и Тристан-да-Кунья","Республика Конго","Реюньон","Руанда","Сан-Томе и Принсипи","Свазиленд",
      "Сейшельские Острова","Сенегал","Сомали","Судан","Сьерра-Леоне","Танзания","Того","Тунис","Уганда","Центральноафриканская Республика",
      "Чад","Экваториальная Гвинея","Эритрея","Эфиопия","Южная Африка","Южный Судан"
    ]
  },
  {
    continent: "Центральная Америка",
    countries: [
          "Белиз", "Гватемала", "Гондурас", "Коста-Рика", "Никарагуа", "Панама", "Эль-Сальвадор"
    ]
  },
  {
    continent: "Южная Америка",
    countries: [
      "Аргентина", "Боливия", "Бразилия", "Венесуэла", "Гайана", "Колумбия", "Парагвай", "Перу", "Суринам", "Уругвай",
      "Фолклендские острова", "Французская Гвиана", "Чили", "Эквадор", "Южная Георгия и Южные Сандвичевы острова"
    ]
  },
  {
    continent: "Карибский бассейн",
    countries: [
      "Ангилья", "Антигуа и Барбуда", "Аруба", "Багамские Острова", "Барбадос", "Британские Виргинские острова", "Виргинские Острова",
      "Гаити", "Гваделупа", "Гренада", "Доминика", "Доминиканская Республика", "Каймановы острова", "Куба", "Кюрасао", "Мартиника",
      "Монтсератт", "Нидерландские Антильские острова", "Остров Навасса", "Пуэрто-Рико", "Сен-Бартелеми", "Сен-Мартен", "Сент-Винсент и Гренадины",
      "Сент-Китс и Невис", "Сент-Люсия", "Синт-Мартен", "Теркс и Кайкос", "Тринидад и Тобаго", "Ямайка"
    ]
  },
  {
    continent: "Океания",
    countries: [
      "Австралия", "Американское Самоа", "Вануату", "Гуам", "Кирибати", "Кокосовые острова", "Маршалловы Острова", "Микронезия", "Науру", "Ниуэ",
      "Новая Зеландия", "Новая Каледония", "Остров Норфолк", "Остров Рождества", "Остров Уэйк", "Острова Ашмор и Картье", "Острова Кораллового моря",
      "Острова Кука", "Острова Питкэрн", "Палау", "Самоа", "Северные Марианские острова", "Соломоновы Острова", "Токелау", "Тонга", "Тувалу",
      "Уоллис и Футуна", "Фиджи", "Французская Полинезия"
    ]
  }
]

export interface Francobolli {
  imageSrc: string;
  author: string;
  issueYear: number;
  issuedCountry: string;
  value?: number;
  cost?: number|string;
  currency?: string;
  valueRub?: number;
  widthRatio?: number;
  heightRatio?: number;
  description?: string;
  purchaseDate?: Date;
}



export const testFranco = [
  {
    imageSrc: 'assets/page4/4-блок1.jpg',
    author: 'Блок',
    issuedCountry: 'СССР',
    issueYear: 1956,
  },
  {
    imageSrc: 'assets/page4/4-блок2.jpg',
    author: 'Блок',
    issuedCountry: 'СССР',
    issueYear: 1980,
  },
  {
    imageSrc: 'assets/page4/4-маяк1.jpg',
    author: 'Маяковский',
    issuedCountry: 'СССР',
    issueYear: 1940,
  },
  {
    imageSrc: 'assets/page4/4-пастернак.jpg',
    author: 'Пастернак',
    issuedCountry: 'СССР',
    issueYear: 1990,
    widthRatio: 2,
    heightRatio: 2,
  },
  {
    imageSrc: 'assets/page4/4-брюсов1.jpg',
    author: 'Брюсов',
    issuedCountry: 'СССР',
    issueYear: 1963,
  },
  {
    imageSrc: 'assets/page4/4-брюсов2.jpg',
    author: 'Брюсов',
    issuedCountry: 'Армения',
    issueYear: 2011,
  }]

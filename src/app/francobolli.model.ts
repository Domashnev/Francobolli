export class Francobolli {
  imageSrc: string;
  author: string;
  issueYear: number;
  issuedCountry: string;

  value?: number;
  cost?: number | string;
  currency?: string;
  valueRub?: number;
  widthRatio?: number;
  heightRatio?: number;

  description?: string;
  purchaseDate?: string;

  constructor(imageSrc: string) {
    this.imageSrc = imageSrc
    this.author = ''
    this.issueYear= 1900
    this.issuedCountry= ''
  }
}

export interface AssetsImageList {
  folder: string;
  images: string[];
}

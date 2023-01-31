export class Francobolli {
  imageSrc: string;
  fileName?: string;
  author: string;
  issueYear: number;
  issuedCountry: string;
  description: string;

  value?: number;
  cost?: number | string;
  currency?: string;
  valueRub?: number;
  widthRatio?: number;
  heightRatio?: number;

  purchaseDate?: string;
  regNum?: string;
  regNum2?: string;

  constructor(imageSrc: string) {
    this.imageSrc = imageSrc
    this.author = ''
    this.issueYear= 1900
    this.issuedCountry= ''
    this.description = ''
  }
}

export interface AssetsImageList {
  folder: string;
  images: string[];
}

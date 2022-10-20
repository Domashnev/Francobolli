export interface Francobolli {
  imageSrc: string;
  author: string;
  issuedYear: number;
  issuedCountry: string;
  value?: number;
  currency?: string;
  valueRub?: number;
  widthRatio?: number;
  heightRatio?: number;
}

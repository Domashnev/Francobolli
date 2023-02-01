export class Francobolli {
  imageSrc: string;
  author: string;
  issueYear: number;
  issuedCountry: string;
  description: string;
  cost?: number | string;
  purchaseDate?: string;

  regNum?: string;
  regNum2?: string;

  widthRatio?: number;
  heightRatio?: number;

  constructor(imageSrc: string, author?: string ) {
    this.imageSrc = imageSrc
    this.author = author ?? ''
    this.issuedCountry= ''
    this.issueYear = 0
    this.description = ''
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
}

export interface AssetsImageList {
  folder: string;
  images: string[];
}

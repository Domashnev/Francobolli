export class Francobolli {
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

  constructor(imageSrc: string, author?: string, country?: string ) {
    this.imageSrc = imageSrc
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

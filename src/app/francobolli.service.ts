import { Injectable } from '@angular/core';
import { Francobolli } from './francobolli.model';

@Injectable({
  providedIn: 'root'
})
export class FrancobolliService {

  constructor() { }

  getFrancobolli(): Francobolli[] {
    return [
      {
        imageSrc: 'assets/page4/4-блок1.jpg',
        author: 'Блок',
        issuedCountry: 'СССР',
        issuedYear: 1956,
      },
      {
        imageSrc: 'assets/page4/4-блок2.jpg',
        author: 'Блок',
        issuedCountry: 'СССР',
        issuedYear: 1980,
      },
      {
        imageSrc: 'assets/page4/4-маяк1.jpg',
        author: 'Маяковский',
        issuedCountry: 'СССР',
        issuedYear: 1940,
      },
      {
        imageSrc: 'assets/page4/4-пастернак.jpg',
        author: 'Пастернак',
        issuedCountry: 'СССР',
        issuedYear: 1990,
        widthRatio: 2,
        heightRatio: 2,
      },
      {
        imageSrc: 'assets/page4/4-брюсов1.jpg',
        author: 'Брюсов',
        issuedCountry: 'СССР',
        issuedYear: 1963,
      },
      {
        imageSrc: 'assets/page4/4-брюсов2.jpg',
        author: 'Брюсов',
        issuedCountry: 'Армения',
        issuedYear: 2011,
      },
      ]
  }
}

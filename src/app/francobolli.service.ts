import { Injectable, Type } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, forkJoin, Subject, BehaviorSubject} from "rxjs";
import {
  AssetsImageList,
  Author,
  CountriesByContinent,
  CountryAndContinent,
  Francobolli
} from './francobolli.model';
import {FirebaseService} from "./firebase.service";

@Injectable({providedIn:  'root'})
export class FrancobolliService {
  allCountries: CountryAndContinent[]
  continentCountries = CountriesByContinent

  countries: string[] = [] // Страны выпустившие марки
  patrie: string[] = []    // Родины авторов

  authorsMap = new Map<string, Francobolli[]>()
  catalogAuthors: Author[] = []

  catalog: Francobolli[]
  foundItemsSubject: Subject<Francobolli[]> = new Subject<Francobolli[]>()

  importFranco: Francobolli[] = []
  assetsImageList: AssetsImageList[] = []
  imageListSubject: Subject<AssetsImageList[]> = new Subject()

  constructor(private http: HttpClient,
              private firebaseService: FirebaseService) {

    this.prepareAllCountries()

    forkJoin([
      this.firebaseService.getCatalogo(),
      this.firebaseService.getImportStamps(),
      this.getAssetsImageList(),
      this.firebaseService.getAuthors()
    ]).subscribe( response => {
      const countriesSet = new Set<string>()

      this.catalog = response[0].filter(f => !['Волейбол', 'Pallavolo', 'Pinocchio'].includes(f.author))
      this.foundItemsSubject.next(this.catalog.slice(0,50))

      this.catalogAuthors = response[3].sort((a1, a2) => a1.name > a2.name ? 1 : -1)
      const patrieSet = new Set<string>()
      this.catalogAuthors.forEach((item, index) => {
        patrieSet.add(item.country)
        const fac = this.allCountries.find(c => c.country === item.country)
        if (fac){
          fac.authors ? fac.authors.push(item.name) : fac.authors = [item.name]
        } else {
          console.log('Не найдена страна ' + item.country, item.name)
        }
      })
      this.patrie = Array.from(patrieSet).sort()

      this.allCountries.sort((c1, c2) => (c2.authors ? c2.authors.length: 0) - (c1.authors ? c1.authors.length : 0))

      this.authorsMap.set('UNDEFINED', [])
      this.catalog.forEach(item => {
         const auth = this.catalogAuthors.find(a => item.author.includes(a.name))
         if ( !auth ) {
           this.authorsMap.get('UNDEFINED')?.push(item)
         }else if (this.authorsMap.has(auth.name)) {
           this.authorsMap.get(auth.name)?.push(item)
         } else {
           this.authorsMap.set(auth.name, [item])
         }
      })
      if ( this.authorsMap.has('UNDEFINED') && this.authorsMap.get('UNDEFINED')?.length) {
        console.log('Не найдены авторы ', this.authorsMap.get('UNDEFINED'))
      }
      if( this.authorsMap.has('UNDEFINED') && this.authorsMap.get('UNDEFINED')?.length === 0 ) this.authorsMap.delete('UNDEFINED')


      this.catalog.forEach(i => { if (i.issuedCountry) countriesSet.add(i.issuedCountry) } )
      this.countries = Array.from(countriesSet).sort()
      // console.log('Марок: ' + this.catalog.length, ' из ' + this.countries.length + ' стран')
      // console.log('Авторов: ' + this.authorsMap.size, ' из ' + this.allCountries.filter(c => c.authors).length + ' стран')

      this.importFranco = response[1].data().import
      this.removeCatalogItemsFromImport()

      this.assetsImageList = response[2] as AssetsImageList[]
      this.assetsImageList.forEach(fold => fold.images = fold.images.map(img=> this.getImageFullPath(fold.folder, img)))
      this.removeCatalogItemsFromImageList()
      this.imageListSubject.next(this.assetsImageList)
    })

  }

  findAuthor(fio: string, country: string): void {
    this.foundItemsSubject.next( this.catalog.filter(item =>
      ( !fio || (fio && item.author?.includes(fio)) ) &&
      (!country || (country && item.issuedCountry===country))).slice(0,100) )
  }

  findAuthorsByPatria(country: string): void {
    const authorsFromPatria = this.catalogAuthors.filter(a => a.country === country).slice()
    authorsFromPatria.forEach(i => {
        i.name = i.name.toLowerCase()
        i.alterName = i.alterName?.toLowerCase()
      })

    const stamps = this.catalog.filter(item =>
      authorsFromPatria.find( a =>
        item.author.toLowerCase().includes(a.name)
        ||
        a.alterName?.includes(item.author.toLowerCase())
      )
    )

    this.foundItemsSubject.next(stamps)
  }

  getImageFullPath(folder: string, fileName: string): string {
    return 'assets/' + folder + '/' + fileName
  }

  getFrancobolliJson(pathToJson: string): Observable<any> {
    return this.http.get(pathToJson)
  }

  getAssetsImageList(): Observable<any> {
    return this.http.get("assets/imageList.json")
  }

  getCountries(): string[] {
    return this.countries
  }

  prepareAllCountries(): void {
    this.allCountries = []
    CountriesByContinent.forEach(cont =>  cont.countries.forEach(country => this.allCountries.push( { id: this.allCountries.length+1, continent: cont.continent, country })))
  }

  removeCatalogItemsFromImport(item?: Francobolli): void {
    if( item && !item.description) return
    if(item) {
      this.importFranco = this.importFranco.filter(f => f.description !== (item.description ?? '')
      && ((f.regNum ?? '') !== (item.regNum ?? '')))
    } else {
      const catalogDescriptions = this.catalog.map(i => (i.description ?? '') + (i.regNum ?? '')).filter(i=>i)
      this.importFranco = this.importFranco.filter( f =>
        !catalogDescriptions.includes(f.description + (f.regNum ?? ''))
      )
    }
  }

  removeCatalogItemsFromImageList(item?: Francobolli): void {
    if (item){
      this.assetsImageList.forEach(fold => {
        fold.images = fold.images.filter(imgPath => imgPath !== item.imageSrc)
      })
    } else {
      const catalogImageSrc = this.catalog.map(i => i.imageSrc)
      this.assetsImageList.forEach(fold => {
        fold.images = fold.images.filter(imgPath => !catalogImageSrc.includes(imgPath))
      })
    }

    this.imageListSubject.next(this.assetsImageList)
  }

  saveInCatalog(item: Francobolli): void {
    this.catalog.push(Object.assign({}, item))
    this.removeCatalogItemsFromImport(item)
    this.removeCatalogItemsFromImageList(item)

    const authorItems: any[] = []
    this.catalog.filter(i => i.author === item.author)
      .forEach(i => authorItems.push({...i}))
    this.firebaseService.updateAuthor(item.author, authorItems)
  }

  saveAllCatalog(): void {
    this.firebaseService.saveAllCatalog(this.catalog).then()
  }

  saveAuthors(): void {
    this.firebaseService.setAuthors(this.catalogAuthors).then()
  }

  saveImportFranco(): void {
    this.firebaseService.updateJsonToFirebase('stamps', 'import', this.importFranco)
      .then(() => alert('Updated'))
  }

  importJSON(path: string): void {
    this.getFrancobolliJson(path)
      .pipe(
        catchError(error => {
          alert(error.message)
          throw error
        })
      )
      .subscribe(data => {
        this.importFranco = data.concat(this.importFranco)
      })
  }

  transliterate(word: string): string{
    const a: any = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"А","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

    return word.split('').map(function (char) {
      return a[char] || char;
    }).join("");
  }

}

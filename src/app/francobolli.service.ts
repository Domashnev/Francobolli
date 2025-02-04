import { Injectable, Type } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, forkJoin, Subject, BehaviorSubject, ReplaySubject} from "rxjs";
import {
  AssetsImageList,
  Author, ContinentCountryAuthors,
  CountriesByContinent,
  CountryAndContinent, CountryAuthors,
  Francobolli
} from './francobolli.model';
import {FirebaseService} from "./firebase.service";

export interface SearchPattern {
  patria?: string;
  issuedCountry?: string;
  author: string;
  issueYear?: number;
}

@Injectable({providedIn:  'root'})
export class FrancobolliService {
  allCountries: CountryAndContinent[]
  continentCountries = CountriesByContinent
  authorTree: ContinentCountryAuthors[]

  countries: string[] = [] // Страны выпустившие марки
  patrie: string[] = []    // Родины авторов
  issueYears: number[]=[]   // Года выпусков

  authorsMap = new Map<string, Francobolli[]>()
  catalogAuthors: Author[] = []

  catalog: Francobolli[]
  foundItemsSubject: BehaviorSubject<Francobolli[]> = new BehaviorSubject<Francobolli[]>([])
  editFrancoSubject: Subject<Francobolli>= new Subject<Francobolli>()

  importFranco: Francobolli[] = []
  assetsImageList: AssetsImageList[] = []
  imageListSubject: Subject<AssetsImageList[]> = new Subject()
  searchPattern: SearchPattern = {author: ''}
  currentCatalogName: string = ''

  constructor(private http: HttpClient,
              private firebaseService: FirebaseService) {

  }

  getMainCatalog(): void {
    this.prepareAllCountries()
    forkJoin([
      this.firebaseService.getCatalogo(),
      // this.firebaseService.getImportStamps(),
      // this.getAssetsImageList(),
      this.firebaseService.getAuthors()
    ]).subscribe( response => {
      const countriesSet = new Set<string>()

      this.catalog = response[0].filter(f => !['Pinocchio'].includes(f.author))
        .sort((f1, f2) => (f2.timestamp ?? 0)  - (f1.timestamp ?? 0))
      this.foundItemsSubject.next( this.catalog )

      this.catalogAuthors = response[1].sort((a1, a2) => a1.name > a2.name ? 1 : -1)
      const patrieSet = new Set<string>()
      this.catalogAuthors.forEach((item, index) => {
       // item.name = item.name.split(' ').map((n, nInd) => (nInd>0 && ['de', 'del', 'di', 'van'].includes(n.toLowerCase())) ? n.toLowerCase() : n).join(' ')
        patrieSet.add(item.country)
        const fac = this.allCountries.find(c => c.country === item.country)
        if (fac){
          fac.authors ? fac.authors.push(item.name) : fac.authors = [item.name]
        } else {
          console.log('Не найдена страна ' + item.country, item)
        }
      })
      this.patrie = Array.from(patrieSet).sort()

      this.allCountries.sort((c1, c2) => (c2.authors ? c2.authors.length: 0) - (c1.authors ? c1.authors.length : 0))

      this.authorsMap.set('UNDEFINED', [])
      this.catalog.forEach((item, index) => {
        // Несколько фамилий писать через ЗПТ!!!
        item.author.split(',').forEach(fio => {
          const auth = this.catalogAuthors.find(a => a.name.includes(fio.trim()))
          if ( !auth ) {
            this.authorsMap.get('UNDEFINED')?.push(item)
          }else if (this.authorsMap.has(auth.name)) {
            this.authorsMap.get(auth.name)?.push(item)
          } else {
            this.authorsMap.set(auth.name, [item])
          }
        })

        if (item.issueYear && !this.issueYears.includes(item.issueYear)){
           this.issueYears.push(item.issueYear)
        }
      })
      this.issueYears = this.issueYears.sort()

      if ( this.authorsMap.has('UNDEFINED') && this.authorsMap.get('UNDEFINED')?.length) {
        console.log('Не найдены авторы ', this.authorsMap.get('UNDEFINED'))
      }
      if( this.authorsMap.has('UNDEFINED') && this.authorsMap.get('UNDEFINED')?.length === 0 ) this.authorsMap.delete('UNDEFINED')

      this.catalog.forEach(i => { if (i.issuedCountry) countriesSet.add(i.issuedCountry) } )
      this.countries = Array.from(countriesSet).sort()

      // this.checkCatalogForDoubles()

      // this.assetsImageList = response[2] as AssetsImageList[]
      // this.assetsImageList.forEach(fold => fold.images = fold.images.map(img=> this.getImageFullPath(fold.folder, img)))
      // this.removeCatalogItemsFromImageList()
      // this.imageListSubject.next(this.assetsImageList)

      this.authorTree = this.getContinentsData()
    })

  }

  findAuthorInCatalog(name?: string): void {
    if( !name && !this.searchPattern.author) {
      // this.foundItemsSubject.next(this.catalog)
      return
    }
    if (name) this.searchPattern.author = name
    this.foundItemsSubject.next( this.catalog.filter(item => item.author.includes(this.searchPattern.author) ))
    this.searchPattern.patria = ''
    this.searchPattern.issueYear = 0
    this.searchPattern.issuedCountry = ''
  }

  findStampsByCountry(country?: string | string[]): void {
    if(!country && !this.searchPattern.issuedCountry) { return }
    if (!country && this.searchPattern.issuedCountry)  country = this.searchPattern.issuedCountry

    this.foundItemsSubject.next(
      this.catalog.filter(item => typeof country === 'string'
          ? item.issuedCountry === country
          : country?.includes(item.issuedCountry))
        .sort((f1, f2) =>
          f1.author === f2.author
        ? (f1.issueYear ?? 0)  - (f2.issueYear ?? 0)
        : (f1.author > f2.author) ? 1 : -1
    ))
    this.searchPattern.patria = ''
    this.searchPattern.issueYear = 0
    this.searchPattern.author = ''
  }

  findStampsByIssueYear( issueYear?: number): void {
    if ( !issueYear && !this.searchPattern.issueYear) { return }
    if (issueYear) this.searchPattern.issueYear = issueYear
    this.foundItemsSubject.next(
      this.catalog.filter(item => item.issueYear === this.searchPattern.issueYear )
      .sort((f1, f2) => (f1.author > f2.author) ? 1 : -1)
    )
    this.searchPattern.patria = ''
    this.searchPattern.author = ''
    this.searchPattern.issuedCountry = ''
  }


  checkCatalogForDoubles(): void {
    this.catalog.forEach(item => {
      if( this.catalog.filter(i => i.imageSrc === item.imageSrc).length > 1 ) {
        console.log('Double: ', item)
      }
    })
  }

  findAuthorsByPatria(patria?: string): void {
    if(!patria && !this.searchPattern.patria) {
      // this.foundItemsSubject.next(this.catalog)
      return
    }
    if (patria) this.searchPattern.patria = patria

    const authorsFromPatria = this.catalogAuthors.filter(a => a.country === this.searchPattern.patria)
    const stamps = this.catalog.filter(item => authorsFromPatria.find( a => item.author.toLowerCase().includes(a.name.toLowerCase())))
      .sort((f1, f2) =>
        f1.issuedCountry === f2.issuedCountry
          ? (f1.issueYear ?? 0)  - (f2.issueYear ?? 0)
          : (f1.issuedCountry > f2.issuedCountry) ? 1 : -1
      )
    this.foundItemsSubject.next(stamps)
    this.searchPattern.author = ''
    this.searchPattern.issueYear = 0
    this.searchPattern.issuedCountry = ''
  }

  getImageFullPath(folder: string, fileName: string): string {
    return 'assets/' + folder + '/' + fileName
  }

  getFrancobolliJson(pathToJson: string): Observable<any> {
    return this.http.get(pathToJson)
  }

  prepareAllCountries(): void {
    this.allCountries = []
    CountriesByContinent.forEach(cont =>  cont.countries.forEach(country => this.allCountries.push( { id: this.allCountries.length+1, continent: cont.continent, country })))
  }

  getContinentsData(): ContinentCountryAuthors[] {
    const continents: ContinentCountryAuthors[] = []
    const uniqueContinent = new Set(this.allCountries.filter(c => c.authors).map(c => c.continent))

    uniqueContinent.forEach(continent => {
      const countries: CountryAuthors[] = this.allCountries.filter(c => c.continent === continent && c.authors?.length)
        .map( c => {
          const countryAuthors : CountryAuthors = {
            country: c.country,
            authorAmount:
                c.authors!.map( a=> { return {author: a, amount: this.catalog.filter(s => s.author.includes(a) ).length } })
                .sort((a1, a2) => {
                  if (a1.amount !== a2.amount) {
                    return a2.amount - a1.amount
                  } else
                  return a2.author > a1.author ? -1 : 1
                }),
            stampsTotal: 0
          }
          countryAuthors.stampsTotal = countryAuthors.authorAmount
            .reduce((acc, a) => acc += a.amount, 0)
          return countryAuthors
        })

      continents.push({
        continent, data: countries,
        continentAuthorsTotal: countries.reduce((acc, c) => acc += c.authorAmount.length, 0),
        continentStampsTotal: countries.reduce((acc, c) =>
          acc += c.authorAmount.reduce((stampsAcc, author) => stampsAcc += author.amount, 0), 0)
      })
    })
    return continents
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
    this.catalog.forEach(i => delete i['__KEY__'])
    // console.log(this.catalog)
    this.firebaseService.saveAllCatalog(this.catalog, this.currentCatalogName)
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

  shuffle(arr: any, count: number = 1) {
    if (arr.length < 3) { return arr; }
    for (let c = 0; c < count; c++) {
      for (let i = 0; i < arr.length; i++) {
        let newIndex = i;
        while (newIndex == i || newIndex >= arr.length) {
          newIndex = Math.floor((Math.random() * arr.length));
        }
        [arr[i], arr[newIndex]] = [arr[newIndex], arr[i]];
      }
    }
    return arr;
  }

  getOtherCatalog(theme: string): void {
    this.prepareAllCountries()
    this.firebaseService.getCatalogo(theme)
      .subscribe(data => {
        const countriesSet = new Set<string>()
        this.catalog = data
        this.issueYears = []
        this.catalog.forEach(i => {
          if (i.issuedCountry) countriesSet.add(i.issuedCountry)
          if (i.issueYear && !this.issueYears.includes(i.issueYear)) this.issueYears.push(i.issueYear)
        })

        this.issueYears = this.issueYears.sort()
        this.countries = Array.from(countriesSet).sort()
        this.authorTree = this.getContinentsDataVolley()
        console.log(this.authorTree)

        this.foundItemsSubject.next(this.catalog)
      })
  }

  getContinentsDataVolley(): ContinentCountryAuthors[] {
    const continents: ContinentCountryAuthors[] = []
    this.prepareAllCountries()
    const uniqueContinent = new Set(this.allCountries.map(c => c.continent))

    uniqueContinent.forEach(continent => {
      const countries: CountryAuthors[] = this.allCountries.filter(c => c.continent === continent)
        .map( c => {
          const countryAuthors : CountryAuthors = {
            country: c.country,
            authorAmount: [],
            stampsTotal: this.catalog.filter(s => s.issuedCountry === c.country ).length
          }
          return countryAuthors
        }).filter( c => c.stampsTotal > 0)

      const contTotal = countries.reduce((acc, c) => acc += c.stampsTotal, 0)
      if( contTotal > 0 ) continents.push(
        {
        continent,
        data: countries,
        continentStampsTotal: contTotal
      })
    })
    return continents
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, forkJoin, Subject, BehaviorSubject} from "rxjs";
import {AssetsImageList, Francobolli} from './francobolli.model';
import {FirebaseService} from "./firebase.service";

@Injectable()
export class FrancobolliService {
  countries: string[] = []
  authors: string[] = []

  catalog: Francobolli[] = []
  importFranco: Francobolli[] = []
  assetsImageList: AssetsImageList[] = []
  imageListSubject: Subject<AssetsImageList[]> = new Subject()

  constructor(private http: HttpClient,
              private firebaseService: FirebaseService) {
    forkJoin([
      this.firebaseService.getCatalog(),
      this.firebaseService.getImportStamps(),
      this.getAssetsImageList()
    ]).subscribe( response => {
      const countriesSet = new Set<string>()
      const authorsSet = new Set<string>()

      this.catalog = response[0]
      this.catalog.forEach(i => {
        if (i.issuedCountry) countriesSet.add(i.issuedCountry)
        if (i.author) authorsSet.add(i.author)
      })

      this.importFranco = response[1].data().import
      this.removeCatalogItemsFromImport()

      // Справочник СТРАН И ФАМИЛИЙ
      this.importFranco.forEach(f => {
        if (f.issuedCountry) countriesSet.add(f.issuedCountry)
        if (f.author) authorsSet.add(f.author)
      })
      this.countries = Array.from(countriesSet).sort()
      this.authors = Array.from(authorsSet).sort()

      this.assetsImageList = response[2] as AssetsImageList[]
      this.assetsImageList.forEach(fold => fold.images = fold.images.map(img=> this.getImageFullPath(fold.folder, img)))
      this.removeCatalogItemsFromImageList()
      this.imageListSubject.next(this.assetsImageList)
    })

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

  getAuthors(): string[] {
    return this.authors
  }

  getCountries(): string[] {
    return this.countries
  }

  removeCatalogItemsFromImport(item?: Francobolli): void {
    if(item) {
      this.importFranco = this.importFranco.filter(f =>
        (item.description && f.description !== item.description)
        || (item.regNum && item.regNum !== f.regNum)
        || (item.regNum2 && item.regNum2 !== f.regNum2)
      )
    } else {
      const catalogDescriptions = this.catalog.map(i => i.description)
      console.log('Удалено из импорта: ' + this.importFranco.filter( f => catalogDescriptions.includes(f.description)).length)
      this.importFranco = this.importFranco.filter( f => !catalogDescriptions.includes(f.description))
    }
  }

  removeCatalogItemsFromImageList(item?: Francobolli): void {
    if (item){
      this.assetsImageList.forEach(fold => {
        fold.images = fold.images.filter(imgPath => imgPath !== item.imageSrc)
      })
    } else {
      this.assetsImageList.forEach(fold => {
        fold.images = fold.images
          .filter(imgPath => !this.catalog.map(i => i.imageSrc).includes(imgPath))
      })
    }

    this.imageListSubject.next(this.assetsImageList)
  }

  saveInCatalog(item: Francobolli): void {
    this.catalog.push(item)
    this.removeCatalogItemsFromImport(item)
    this.removeCatalogItemsFromImageList(item)

    const authorItems: any[] = []
    this.catalog.filter(i => i.author === item.author)
      .forEach(i => authorItems.push({...i}))
    this.firebaseService.updateAuthor(item.author, authorItems)
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
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Francobolli } from './francobolli.model';

@Injectable()
export class FrancobolliService {
  countries: string[] = []
  authors: string[] = []
  catalog: Francobolli[] = []
  importFranco: Francobolli[] = []

  constructor(private http: HttpClient) { }

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

  saveInCatalog(item: Francobolli): void {
    this.catalog.push(item)
    this.importFranco =  this.importFranco.filter( f => (item.description && f.description!==item.description)
    || (item.regNum && item.regNum!==f.regNum) || (item.regNum2 && item.regNum2!==f.regNum2))

    console.log(this.catalog)
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

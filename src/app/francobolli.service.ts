import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class FrancobolliService {
  countries: string[] = []
  authors: string[] = []

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
}

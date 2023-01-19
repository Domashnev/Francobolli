import { Injectable } from '@angular/core';
import {Francobolli, testFranco} from './francobolli.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FrancobolliService {

  constructor(private http: HttpClient) { }


  getFromFile():any {
    this.getFrancobolliJson().subscribe(data => {

    })
  }
  getFrancobolliJson(): Observable<any> {
    return this.http.get('assets/ПокупкаМарок.json')
  }

  getFrancobolli(): Francobolli[] {
    return testFranco
  }
}

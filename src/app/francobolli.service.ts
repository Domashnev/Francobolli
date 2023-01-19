import { Injectable } from '@angular/core';
import {Francobolli, testFranco} from './francobolli.model';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class FrancobolliService {

  constructor(private http: HttpClient) { }

  getFrancobolliJson(pathToJson: string): Observable<any> {
    return this.http.get(pathToJson)
  }

  getFrancobolli(): Francobolli[] {
    return testFranco
  }
}

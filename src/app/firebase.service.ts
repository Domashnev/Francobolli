import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Observable, map, of} from 'rxjs'
import { Author, Francobolli } from "./francobolli.model";

@Injectable({providedIn:  'root'})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  updateJsonToFirebase(collection: string, document: string, data: any): Promise<any> {
    return this.firestore.collection(collection).doc(document).update({ import: data})
  }

  getImportStamps(): Observable<any> {
    return this.firestore.collection('stamps').doc('import').get()
  }

  updateAuthor(author: string, items: any): void {
    let updateData: { [author: string] :any} = {}
    updateData[author] = items
    this.firestore.collection('stamps').doc('catalog')
      .update(updateData).then()
  }

  saveAllCatalog(catalog: Francobolli[], theme?: string): void {
  //  if ( confirm('Сохранить каталог ' + (theme ?? 'ПИСАТЕЛИ') + '\nРазмер: ' + catalog.length ) ) {
      this.firestore.collection('stamps').doc(theme ? theme : 'catalogo')
        .update({ authors: catalog })
        .then()
        .catch(err => alert(err.message()))
//    }
  }

  getCatalog(): Observable<Francobolli[]> {
    return this.firestore.collection('stamps').doc('catalog').get()
      .pipe(
        map( items => {
          const data = items.data() as any
          let catalog: Francobolli[] = []
          for (const author in data) {
            catalog = catalog.concat(data[author])
          }
          return catalog
        })
      )
  }

  getCatalogo(theme?: string): Observable<Francobolli[]> {
    return this.firestore.collection('stamps').doc( theme ?? 'catalogo').get()
      .pipe(
        map( items => {
          const data = items.data() as any
          let catalog: Francobolli[] = data.authors
          /*for (const author in data) {
            catalog = catalog.concat(data[author])
          }*/
          return catalog
        })
      )
  }

  setAuthors(authors: Author[]): Promise<any> {
    return this.firestore.collection('stamps').doc('authors')
      .set({ authors })
  }

  getAuthors(): Observable<Author[]> {
    return this.firestore.collection('stamps').doc('authors').get()
      .pipe(
        map( (items: any) => items.data().authors)
      )
  }

}


import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Francobolli } from "./francobolli.model";

@Injectable()
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


}


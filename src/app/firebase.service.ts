import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Francobolli } from './francobolli.model';
import { Observable, tap } from 'rxjs';

@Injectable()
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  updateJsonToFirebase(collection: string, document: string, data: any): Promise<any> {
    return this.firestore.collection(collection).doc(document).update({ import: data})
  }

  getImportStamps(): Observable<any> {
    return this.firestore.collection('stamps').doc('import').get()
  }

}


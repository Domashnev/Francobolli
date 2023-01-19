import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DxGalleryModule, DxTileViewModule, DxDataGridModule } from 'devextreme-angular';
import { IvyGalleryModule } from 'angular-gallery';
import { AgguingereComponent } from './catalog/agguingere/agguingere.component';
import { ImportToCatalogComponent } from './catalog/import-to-catalog/import-to-catalog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FrancobolliService } from './francobolli.service';
import { FirebaseService } from './firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    AgguingereComponent,
    ImportToCatalogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DxGalleryModule,
    DxTileViewModule,
    DxDataGridModule,
    IvyGalleryModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
//    provideFirebaseApp(() => initializeApp(environment.firebase)),
//    provideFirestore(() => getFirestore()),
  ],
  providers: [
      FrancobolliService,
      FirebaseService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DxGalleryModule,
  DxTileViewModule,
  DxDataGridModule,
  DxTabsModule,
  DxFormModule,
  DxSelectBoxModule,
  DxAutocompleteModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxTextAreaModule,
  DxButtonModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { IvyGalleryModule } from 'angular-gallery';
import { AgguingereComponent } from './catalog/agguingere/agguingere.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FrancobolliService } from './francobolli.service';
import { FirebaseService } from './firebase.service';
import { DxoValidationModule } from 'devextreme-angular/ui/nested';
import { Routes, RouterModule } from '@angular/router';
import { GuardareComponent } from './catalog/guardare/guardare.component';
import { ImportComponent } from './catalog/import/import.component';

const routes: Routes = [
  {path: 'import', component: ImportComponent },
  {path: '', component: GuardareComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AgguingereComponent,
    GuardareComponent,
    ImportComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    DxGalleryModule, DxTileViewModule, DxDataGridModule, DxTabsModule,
    DxFormModule, DxSelectBoxModule, DxAutocompleteModule, DxTextBoxModule,
    DxNumberBoxModule, DxTextAreaModule, DxButtonModule, DxValidatorModule, DxoValidationModule,
    IvyGalleryModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [
      FrancobolliService,
      FirebaseService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

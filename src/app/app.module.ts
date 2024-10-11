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
  DxValidatorModule, DxLookupModule, DxTreeListModule, DxTagBoxModule
} from 'devextreme-angular'
import { IvyGalleryModule } from 'angular-gallery';
import { AgguingereComponent } from './catalog/agguingere/agguingere.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DxoValidationModule } from 'devextreme-angular/ui/nested';
import { Routes, RouterModule } from '@angular/router';
import { GuardareComponent } from './catalog/guardare/guardare.component';
import { ImportComponent } from './catalog/import/import.component';
import { ViewComponent } from './catalog/view/view.component';
import { WholeCatalogComponent } from './catalog/whole-catalog/whole-catalog.component';
import { AuthorsComponent } from './catalog/authors/authors.component';
import { NewAuthorComponent } from './catalog/authors/new-author/new-author.component';
import { AuthorStampsComponent } from './catalog/authors/author-stamps/author-stamps.component';
import { InformationComponent } from './catalog/information/information.component';
import { AddAuthorComponent } from './catalog/add-author/add-author.component';

const routes: Routes = [
  {path: '', children: [
      {path: 'import', component: ImportComponent },
      {path: 'catalog', component: WholeCatalogComponent },
      {path: 'authors', component: AuthorsComponent },
      {path: 'volley', component: ViewComponent },
      {path: '', component: ViewComponent}
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AgguingereComponent,
    GuardareComponent,
    ImportComponent,
    ViewComponent,
    WholeCatalogComponent,
    AuthorsComponent,
    NewAuthorComponent,
    AuthorStampsComponent,
    InformationComponent,
    AddAuthorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    DxGalleryModule, DxTileViewModule, DxDataGridModule, DxTabsModule, DxTreeListModule,
    DxFormModule, DxSelectBoxModule, DxAutocompleteModule, DxTextBoxModule, DxLookupModule,
    DxNumberBoxModule, DxTextAreaModule, DxButtonModule, DxValidatorModule, DxoValidationModule,
    DxTagBoxModule,
    IvyGalleryModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

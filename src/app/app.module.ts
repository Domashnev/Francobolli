import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DxGalleryModule, DxTileViewModule } from 'devextreme-angular';
import { IvyGalleryModule } from 'angular-gallery';
import { AgguingereComponent } from './catalog/agguingere/agguingere.component';
import { ImportToCatalogComponent } from './catalog/import-to-catalog/import-to-catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    AgguingereComponent,
    ImportToCatalogComponent
  ],
  imports: [
    BrowserModule,
    DxGalleryModule,
    DxTileViewModule,
    IvyGalleryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

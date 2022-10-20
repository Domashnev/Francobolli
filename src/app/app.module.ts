import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DxGalleryModule, DxTileViewModule } from 'devextreme-angular';
import { IvyGalleryModule } from 'angular-gallery';

@NgModule({
  declarations: [
    AppComponent
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

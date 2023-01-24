import { Component, ViewChild } from '@angular/core';
import { FrancobolliService } from './francobolli.service';
import {AssetsImageList, Francobolli} from './francobolli.model';
import { Gallery } from 'angular-gallery';
import { catchError } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('importGrid') grid: DxDataGridComponent;

  title = 'Francobolli';
  galleryProperties: any = {}

  importFranco: Francobolli[] = []
  assetsImageList: AssetsImageList[] = []
  folders: string[]= []

  catalogItem: Francobolli = new Francobolli('')

  constructor(private francobolliService: FrancobolliService,
              private firebaseService: FirebaseService,
              private gallery: Gallery) {

    this.firebaseService.getImportStamps().subscribe(data => {
      this.importFranco = data.data().import
      const authorSet = new Set<string>()
      const countriesSet = new Set<string>()
      this.importFranco.forEach(f => {
        authorSet.add(f.author)
        countriesSet.add(f.issuedCountry)
      })
      this.francobolliService.authors = Array.from(authorSet).sort()
      this.francobolliService.countries = Array.from(countriesSet).sort()
    })

    this.francobolliService.getAssetsImageList().subscribe( imgList => {
      this.assetsImageList = imgList
      this.folders = this.assetsImageList.map(f => { return f.folder } )
      this.changeFolder(this.assetsImageList[0].folder)
    })

  }

  changeFolder(folderName: string): void {
    const newFold = this.assetsImageList.find(item => item.folder === folderName)
    if( newFold ) {
      this.galleryProperties.images = newFold.images
        .map(f => { return { path: 'assets/' + folderName + '/' +f } } )
    }
  }

  showGallery(index: number = 0) {
    this.galleryProperties.index = index;
    this.gallery.load(this.galleryProperties);
  }

  editFrancobollo(index: number) {
    this.catalogItem.imageSrc = this.galleryProperties.images[index].path
  }

  importJSON(path: string): void {
    this.francobolliService.getFrancobolliJson(path)
      .pipe(
        catchError(error => {
          alert(error.message)
          throw error
        })
      )
      .subscribe(data => {
        this.importFranco = data.concat(this.importFranco)
        // this.saveFrancobolli()
      })
  }

  saveFrancobolli(): void {
    this.firebaseService.updateJsonToFirebase('stamps', 'import', this.importFranco).then(() => alert('Updated'))
  }

  updateCatalogItem(event: any) {
    if( event.rowType === 'data') {
        this.catalogItem = event.data
    }
  }

  setAuthorFilter(author: string): void {
    if(!author){
      this.grid.instance.clearFilter()
    } else {
      this.grid.instance.filter([['author', 'contains', author], 'or', ['description', 'contains', author]])
    }
  }

}


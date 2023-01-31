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

  assetsImageList: AssetsImageList[] = []
  folders: string[]= []

  catalogItem: Francobolli = new Francobolli('')

  constructor(public fs: FrancobolliService,
              private firebaseService: FirebaseService,
              private gallery: Gallery) {

    this.firebaseService.getImportStamps().subscribe(data => {
      this.fs.importFranco = data.data().import
      const authorSet = new Set<string>()
      const countriesSet = new Set<string>()
      this.fs.importFranco.forEach(f => {
        authorSet.add(f.author)
        countriesSet.add(f.issuedCountry)
      })
      this.fs.authors = Array.from(authorSet).sort()
      this.fs.countries = Array.from(countriesSet).sort()
    })

    this.fs.getAssetsImageList().subscribe(imgList => {
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
    this.catalogItem = new Francobolli(this.galleryProperties.images[index].path)
    const fnStart = this.catalogItem.imageSrc.lastIndexOf('/')
    this.catalogItem.fileName = this.catalogItem.imageSrc?.substring(fnStart<0 ? 0 : fnStart+1, this.catalogItem.imageSrc.lastIndexOf('.'))
    if (!this.catalogItem.author) this.catalogItem.author = this.catalogItem.fileName[0].toUpperCase() + this.catalogItem.fileName?.slice(1)
  }

  saveFrancobolli(): void {
    this.firebaseService.updateJsonToFirebase('stamps', 'import', this.fs.importFranco).then(() => alert('Updated'))
  }

  updateCatalogItem(event: any) {
    if( event.rowType === 'data') {
        const catItem = { ...event.data }
        delete catItem.imageSrc
        this.catalogItem = catItem
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


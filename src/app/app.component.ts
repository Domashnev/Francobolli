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

  galleryProperties: any = {}
  fullImageList: AssetsImageList[] = []
  folders: string[]= []
  currentFolderImages: string[]=[]
  currentFolder: string

  catalogItem: Francobolli = new Francobolli('')

  constructor(public fs: FrancobolliService,
              private firebaseService: FirebaseService,
              private gallery: Gallery) {
    this.fs.imageListSubject.subscribe( imgList => {
      this.fullImageList = imgList
      this.folders = this.fullImageList
        .filter(folder => folder.images.length)
        .map(f => f.folder)
      if (this.currentFolder ) this.currentFolderImages = this.fullImageList.find(item => item.folder === this.currentFolder)?.images ?? []
    })
  }

  changeFolder(folderName: string): void {
    this.currentFolder = folderName
    const newFold = this.fullImageList.find(item => item.folder === folderName)
    if( newFold ) this.currentFolderImages = newFold.images
   // if( newFold ) this.galleryProperties.images = newFold.images.map(f =>  { return { path: f } })
  }

  showGallery(index: number = 0) {
    this.galleryProperties.index = index;
    this.gallery.load(this.galleryProperties);
  }

  editFrancobollo(path: string) {
    const fnStart = path.lastIndexOf('/')
    const fileName = path.substring(fnStart<0 ? 0 : fnStart+1, path.lastIndexOf('.')).replace(/[\d-]/g, '')
    let author
    if ( fileName.length > 3 ) {
      author = fileName[0].toUpperCase() + fileName?.slice(1)
    }
    this.catalogItem = new Francobolli(path, author, this.catalogItem?.issuedCountry)
  }

  updateCatalogItem(event: any) {
    if( event.rowType === 'data') {
      this.catalogItem.updateFieldsFromImport(event.data)
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


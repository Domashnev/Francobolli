import { Component  } from '@angular/core';
import { FrancobolliService } from './francobolli.service';
import {AssetsImageList, Francobolli} from './francobolli.model';
import { Gallery } from 'angular-gallery';
import { catchError } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Francobolli';
  galleryProperties: any = {}

  importFranco: Francobolli[] = []
  assetsImageList: AssetsImageList[] = []
  folders: string[]= []
  currentFolderImages : string[] = []
  currentFolderName: string = ""

  newCatalogItem: Francobolli = new Francobolli('')

  constructor(private francobolliService: FrancobolliService,
              private firebaseService: FirebaseService,
              private gallery: Gallery) {

    this.firebaseService.getImportStamps().subscribe(data => {
      this.importFranco = data.data().import
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
      this.currentFolderName = folderName
      this.currentFolderImages = newFold.images
      this.galleryProperties.images = this.currentFolderImages
        .map(f => { return { path: 'assets/' + folderName + '/' +f } } )
    }
  }

  showGallery(index: number = 0) {
    this.galleryProperties.index = index;
    this.gallery.load(this.galleryProperties);
  }

  editFrancobollo(index: number) {

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

}


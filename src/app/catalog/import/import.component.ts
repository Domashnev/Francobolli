import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { AssetsImageList, Francobolli } from '../../francobolli.model';
import { FrancobolliService } from '../../francobolli.service';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  @ViewChild('importGrid') grid: DxDataGridComponent;
  title = "Импорт. Связь с покупками."

  fullImageList: AssetsImageList[] = []
  folders: string[]= []
  currentFolderImages: string[]=[]
  currentFolder: string

  catalogItem: Francobolli = new Francobolli('')

  constructor(public fs: FrancobolliService) {
    this.fs.imageListSubject.subscribe( imgList => {
      this.fullImageList = imgList
      this.folders = this.fullImageList
        .filter(folder => folder.images.length)
        .map(f => f.folder)
      if (this.currentFolder ) this.currentFolderImages = this.fullImageList.find(item => item.folder === this.currentFolder)?.images ?? []
    })
  }

  ngOnInit() {
  }

  changeFolder(folderName: string): void {
    this.currentFolder = folderName
    const newFold = this.fullImageList.find(item => item.folder === folderName)
    if( newFold ) this.currentFolderImages = newFold.images
  }

  editFrancobollo(path: string) {
    const fnStart = path.lastIndexOf('/')
    const fileName = path.substring(fnStart<0 ? 0 : fnStart+1, path.lastIndexOf('.')).replace(/[\d-_]/g, '')
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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Francobolli } from '../../francobolli.model';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-agguingere',
  templateUrl: './agguingere.component.html',
  styleUrls: ['./agguingere.component.css']
})
export class AgguingereComponent implements OnInit {
  @Output() setAuthorFilter: EventEmitter<string> = new EventEmitter<string>()
  francobollo: Francobolli
  saveCatalogFlag: boolean
  newAuthorShow = false
  editStatus: boolean

  constructor(public fs: FrancobolliService) {}

  ngOnInit(): void {
    this.fs.editFrancoSubject.subscribe( franco => {
      this.francobollo = franco
      this.editStatus = franco.author !== ''
    })
  }

  saveItem() {
    this.francobollo.removeEmptyProperties()
    if ( !this.editStatus ) this.fs.catalog.push(this.francobollo)
    this.saveCatalogFlag = true
  }

  authorChanged() {
//    this.setAuthorFilter.emit(this.francobollo.author)
 //   this.fs.findAuthorInCatalog(this.francobollo.author)
  }

  saveCatalog() {
    this.fs.saveAllCatalog()
    this.saveCatalogFlag = false
  }

}

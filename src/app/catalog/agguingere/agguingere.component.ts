import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Francobolli } from '../../francobolli.model';
import { FrancobolliService } from '../../francobolli.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-agguingere',
  templateUrl: './agguingere.component.html',
  styleUrls: ['./agguingere.component.css']
})
export class AgguingereComponent implements OnInit {
  // @Input() francobollo: Francobolli
  @Output() setAuthorFilter: EventEmitter<string> = new EventEmitter<string>()

  saveCatalogFlag: boolean
  francobollo: Francobolli
  newAuthorShow = false

  constructor(public fs: FrancobolliService) {}

  ngOnInit(): void {
    this.francobollo = new Francobolli()
  }

  saveItem() {
    this.francobollo.removeEmptyProperties()
    // this.fs.saveInCatalog(this.francobollo)
    this.fs.catalog.push(Object.assign({},this.francobollo))
    this.francobollo.clear()
    this.saveCatalogFlag = true
  }

  authorChanged() {
    this.setAuthorFilter.emit(this.francobollo.author)
    this.fs.findAuthorInCatalog(this.francobollo.author)
  }

  saveCatalog() {
    this.fs.saveAllCatalog()
    this.saveCatalogFlag = false
  }

  showAddAuthor() {

  }
}

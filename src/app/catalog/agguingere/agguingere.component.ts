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
  francobollo: Francobolli | undefined
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
    // if( this.francobollo) this.francobollo.removeEmptyProperties()
    if ( !this.editStatus ) this.fs.catalog.push(Object.assign({},this.francobollo))
    if (this.francobollo) this.francobollo.author = ''
    this.fs.saveAllCatalog()
  }

  authorChanged() {
//    this.setAuthorFilter.emit(this.francobollo.author)
 //   this.fs.findAuthorInCatalog(this.francobollo.author)
  }

}

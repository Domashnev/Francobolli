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
      console.log(this.francobollo)
    })
  }

  saveItem() {
    // if( this.francobollo) this.francobollo.removeEmptyProperties()
    if ( !this.francobollo?.timestamp ){
      // let maxIndex: number = 0
      // this.fs.catalog.forEach( f => maxIndex = maxIndex < (f.index ?? 0) ? (f.index ?? 0) : maxIndex )
     //  this.francobollo!.index = maxIndex + 1
      this.francobollo!.timestamp = new Date().getTime()
    }

    if ( !this.editStatus ) this.fs.catalog.push(Object.assign({},this.francobollo))
    if (this.francobollo) {
      this.francobollo.author = ''
      this.francobollo.description = ''
    }
    this.fs.saveAllCatalog()
  }

  authorChanged() {
//    this.setAuthorFilter.emit(this.francobollo.author)
 //   this.fs.findAuthorInCatalog(this.francobollo.author)
  }

}

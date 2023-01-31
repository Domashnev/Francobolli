import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Francobolli } from '../../francobolli.model';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-agguingere',
  templateUrl: './agguingere.component.html',
  styleUrls: ['./agguingere.component.css']
})
export class AgguingereComponent implements OnInit {
  @Input() francobollo: Francobolli
  @Output() setAuthorFilter: EventEmitter<string> = new EventEmitter<string>()

  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

  addCountry(event: any) {
    this.fs.countries.push(event.text)
  }

  saveItem() {
    console.log(this.francobollo)
    this.fs.saveInCatalog(this.francobollo)
  }

  authorChanged() {
    this.setAuthorFilter.emit(this.francobollo.author)
  }
}

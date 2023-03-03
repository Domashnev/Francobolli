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
  @Input() francobollo: Francobolli
  @Output() setAuthorFilter: EventEmitter<string> = new EventEmitter<string>()

  saveCatalogFlag: boolean

  constructor(public fs: FrancobolliService) {}

  ngOnInit(): void {
  }

   onFormSubmit(event: any): void {
     this.saveItem()
     notify({
       message: 'Марка сохранена в каталог',
       position: {
         my: 'right top',
         at: 'center top',
       },
     }, 'success', 2000);

     event.preventDefault();
   };

  addCountry(event: any) {
    this.fs.countries.push(event.text)
  }

  saveItem() {
    this.francobollo.removeEmptyProperties()
    this.fs.saveInCatalog(this.francobollo)
    this.francobollo.clear()
    this.saveCatalogFlag = true
  }

  authorChanged() {
    this.setAuthorFilter.emit(this.francobollo.author)
  }

  saveCatalog() {
    this.fs.saveAllCatalog()
    this.saveCatalogFlag = false
  }
}

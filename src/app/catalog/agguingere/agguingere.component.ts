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

  constructor(public fs: FrancobolliService) {}

  ngOnInit(): void {
  }

  fieldChanged(e: any): void {
      console.log(e.dataField, e.value, this.francobollo)
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
  }

  authorChanged() {
    this.setAuthorFilter.emit(this.francobollo.author)
  }
}

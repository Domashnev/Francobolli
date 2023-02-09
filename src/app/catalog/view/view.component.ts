import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';
import { Francobolli } from '../../francobolli.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  viewItems: Francobolli[]=[]

  constructor(public fs: FrancobolliService) {
    this.fs.foundItemsSubject.subscribe(data => {
      this.viewItems = data
      console.log(data)
    }
)
  }

  ngOnInit(): void {
  }

  lookForAuthor(fio: string, country: string) {
    this.fs.findAuthor(fio, country)
  }
}

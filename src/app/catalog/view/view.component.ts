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
      this.viewItems = data.sort( (a, b) => a.author > b.author ? -1 : 1)
    }
)
  }

  ngOnInit(): void {
  }

  lookForAuthor(fio: string, country: string) {
    this.fs.findAuthor(fio, country)
  }
  lookForAuthorsByPatria(patria: string) {
    this.fs.findAuthorsByPatria(patria)
  }
}

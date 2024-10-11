import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';
import { Francobolli } from '../../francobolli.model';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  viewItems: Francobolli[]=[]

  constructor(public fs: FrancobolliService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(([url]) => {
      this.fs.currentCatalogName = ''
      if( url && url.path.includes('volley') ) {
        this.fs.catalogAuthors = []
        this.fs.currentCatalogName = url.path
        this.fs.getOtherCatalog(url.path)
      } // console.log(path); // e.g. /products// console.log(parameters); // e.g. { id: 'x8klP0' }
    });
    this.fs.foundItemsSubject.subscribe(data => {
      this.viewItems = data
      // console.log(data)
    })
  }

  changeFrancobolo(franco: Francobolli) {
    this.fs.editFrancoSubject.next(franco)
  }

  createNewFranco() {
    this.fs.editFrancoSubject.next(new Francobolli())
  }
}

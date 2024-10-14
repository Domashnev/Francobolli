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
      if( url && url.path.includes('volley') ) {
        this.fs.catalogAuthors = []
        this.fs.searchPattern.author = ''
        this.fs.currentCatalogName = url.path
        this.fs.getOtherCatalog(url.path)
      } else {
        this.fs.currentCatalogName = ''
        this.fs.authorTree = []
        this.fs.getMainCatalog()
      }
    });
    this.fs.foundItemsSubject.subscribe(data => {this.viewItems = data})
  }

  changeFrancobolo(franco: Francobolli) {
    this.fs.editFrancoSubject.next(franco)
  }

  createNewFranco() {
    this.fs.editFrancoSubject.next(new Francobolli())
  }
}

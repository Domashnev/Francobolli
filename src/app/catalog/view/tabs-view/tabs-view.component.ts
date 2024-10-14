import {Component, Input, OnInit} from '@angular/core'
import {FrancobolliService} from '../../../francobolli.service'
import {CountryAuthors, levelFieldNames} from '../../../francobolli.model'

@Component({
  selector: 'app-tabs-view',
  templateUrl: './tabs-view.component.html',
  styleUrls: ['./tabs-view.component.css']
})
export class TabsViewComponent implements OnInit {
  levelFields = levelFieldNames
  currentContinent: CountryAuthors[]
  currentCountry: { author: string; amount: number}[] | undefined;

  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

  onItemClick(data: any, level: number) {
    if( level === 0) {
      this.currentContinent = data.itemData.data
      this.currentCountry = this.fs.currentCatalogName === '' && data.itemData.data.length === 1
        ? this.currentContinent[0].authorAmount : undefined
    }
    if( level === 1) {
      if (this.fs.currentCatalogName === ''){
        this.fs.findAuthorsByPatria(data.itemData.country)
        this.currentCountry= data.itemData.authorAmount
      } else {
        this.fs.findStampsByCountry(data.itemData.country)
      }
    }
    if( level === 2) {
      this.fs.findAuthorInCatalog(data.itemData.author)
    }
    // console.log(data)
  }
}

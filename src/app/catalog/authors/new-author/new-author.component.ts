import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../../francobolli.service';
import { Author } from '../../../francobolli.model';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {

  dataSource: DataSource
  author: Author
  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
    this.dataSource = new DataSource({
      store: this.fs.allCountries,
      group: 'continent'
    });
  }

  createAuthor() {
    this.fs.saveAuthors()
  }
}

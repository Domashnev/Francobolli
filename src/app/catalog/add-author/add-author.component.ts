import { Component, OnInit } from '@angular/core';
import {FrancobolliService} from "../../francobolli.service";
import {Author} from "../../francobolli.model";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  newAuthor: Author= { name: '', country: ''}
  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

  addAuthorToCatalog() {
    this.fs.catalogAuthors.push(Object.assign({}, this.newAuthor))
    this.fs.saveAuthors()
    this.newAuthor = { name: '', country: ''}
  }
}

import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';
import {Author, Francobolli} from '../../francobolli.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authorsStamps: Francobolli[] = []
  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

  saveAuthors() {
    this.fs.saveAuthors()
  }

  selectAuthor(author: Author) {
    this.authorsStamps = !author ? [] : this.fs.catalog.filter(f => f.author.includes(author.name)).sort((f1, f2) => (f1.issueYear ?? 0) - (f2.issueYear ?? 0) )
  }
}

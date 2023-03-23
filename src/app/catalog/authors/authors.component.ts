import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';
import { Francobolli } from '../../francobolli.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  pushkin: Francobolli[] = []
  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
    this.pushkin = this.fs.catalog.filter(f => f.author.includes('Пушкин')).sort((f1,f2) => (f1.issueYear ?? 0) - (f2.issueYear ?? 0) )
  }

  saveAuthors() {
    this.fs.saveAuthors()
  }
}

import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

  saveAuthors() {
    this.fs.saveAuthors()
  }
}

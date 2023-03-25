import { Component, Input, OnInit } from '@angular/core';
import { Francobolli } from '../../../francobolli.model';

@Component({
  selector: 'app-author-stamps',
  templateUrl: './author-stamps.component.html',
  styleUrls: ['./author-stamps.component.css']
})
export class AuthorStampsComponent implements OnInit {
  @Input() items: Francobolli[]

  constructor() { }

  ngOnInit(): void {
  }

}

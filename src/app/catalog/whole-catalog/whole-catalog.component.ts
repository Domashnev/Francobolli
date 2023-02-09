import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-whole-catalog',
  templateUrl: './whole-catalog.component.html',
  styleUrls: ['./whole-catalog.component.css']
})
export class WholeCatalogComponent implements OnInit {

  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

}

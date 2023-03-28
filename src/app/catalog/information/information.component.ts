import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

}

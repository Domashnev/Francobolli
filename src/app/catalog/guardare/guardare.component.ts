import { Component, OnInit } from '@angular/core';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-guardare',
  templateUrl: './guardare.component.html',
  styleUrls: ['./guardare.component.css']
})
export class GuardareComponent implements OnInit {

  constructor(public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

}

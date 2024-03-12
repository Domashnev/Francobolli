import { Component } from '@angular/core';
import { FrancobolliService } from './francobolli.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public fs: FrancobolliService) {
  }

}


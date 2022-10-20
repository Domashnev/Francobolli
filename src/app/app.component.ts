import { Component  } from '@angular/core';
import { FrancobolliService } from './francobolli.service';
import { Francobolli } from './francobolli.model';
import { Gallery } from 'angular-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Francobolli';
  francobolli: Francobolli[] = [];
  galleryProperties: any = {}

  constructor(private francobolliService: FrancobolliService,
              private gallery: Gallery) {
    this.francobolli = francobolliService.getFrancobolli()
    this.galleryProperties.images = this.francobolli.map(f => { return { path: f.imageSrc } } )
  }

  showGallery(index: number = 0) {
    this.galleryProperties.index = index;
    this.gallery.load(this.galleryProperties);
  }

}


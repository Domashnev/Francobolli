import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Gallery } from 'angular-gallery';
import { Francobolli } from '../../francobolli.model';
import { FrancobolliService } from '../../francobolli.service';

@Component({
  selector: 'app-guardare',
  templateUrl: './guardare.component.html',
  styleUrls: ['./guardare.component.css']
})
export class GuardareComponent implements OnInit {
  @Input() items: Francobolli[]
  @Output() changeFrancobollo: EventEmitter<Francobolli> = new EventEmitter<Francobolli>()
  galleryProperties: any = {}

  constructor(private gallery: Gallery,
              public fs: FrancobolliService) { }

  ngOnInit(): void {
  }

  showGallery(index: number = 0) {
    if( this.items  ) this.galleryProperties.images = this.items.map(f =>  { return { path: f.imageSrc } })
    this.galleryProperties.index = index;
    this.gallery.load(this.galleryProperties);
    // this.changeFrancobollo.next(this.items[index])
  }

}

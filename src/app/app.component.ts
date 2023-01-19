import { Component  } from '@angular/core';
import { FrancobolliService } from './francobolli.service';
import { Francobolli } from './francobolli.model';
import { Gallery } from 'angular-gallery';
import { catchError } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Francobolli';
  francobolli: Francobolli[] = [];
  galleryProperties: any = {}
  importFranco: Francobolli[] = []

  constructor(private francobolliService: FrancobolliService,
              private firebaseService: FirebaseService,
              private gallery: Gallery) {
    this.francobolli = francobolliService.getFrancobolli()
    this.galleryProperties.images = this.francobolli.map(f => { return { path: f.imageSrc } } )

   // this.importJSON('assets/ПокупкаМарок.json')
   // this.importJSON('assets/МаркиPostbleed.json')
    this.firebaseService.getImportStamps().subscribe(data => {
      this.importFranco = data.data().import
    })

  }

  showGallery(index: number = 0) {
    this.galleryProperties.index = index;
    this.gallery.load(this.galleryProperties);
  }

  importJSON(path: string): void {
    this.francobolliService.getFrancobolliJson(path)
      .pipe(
        catchError(error => {
          alert(error.message)
          throw error
        })
      )
      .subscribe(data => this.importFranco = data.concat(this.importFranco))
  }

  saveFrancobolli(): void {
    this.firebaseService.updateJsonToFirebase('stamps', 'import', this.importFranco).then(() => alert('Updated'))
  }

}


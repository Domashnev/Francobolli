import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportToCatalogComponent } from './import-to-catalog.component';

describe('ImportToCatalogComponent', () => {
  let component: ImportToCatalogComponent;
  let fixture: ComponentFixture<ImportToCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportToCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportToCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

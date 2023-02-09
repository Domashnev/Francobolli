import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeCatalogComponent } from './whole-catalog.component';

describe('WholeCatalogComponent', () => {
  let component: WholeCatalogComponent;
  let fixture: ComponentFixture<WholeCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WholeCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WholeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

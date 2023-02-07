import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardareComponent } from './guardare.component';

describe('GuardareComponent', () => {
  let component: GuardareComponent;
  let fixture: ComponentFixture<GuardareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

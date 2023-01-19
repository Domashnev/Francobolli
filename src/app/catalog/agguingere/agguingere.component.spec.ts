import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgguingereComponent } from './agguingere.component';

describe('AgguingereComponent', () => {
  let component: AgguingereComponent;
  let fixture: ComponentFixture<AgguingereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgguingereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgguingereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

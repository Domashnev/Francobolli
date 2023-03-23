import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorStampsComponent } from './author-stamps.component';

describe('AuthorStampsComponent', () => {
  let component: AuthorStampsComponent;
  let fixture: ComponentFixture<AuthorStampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorStampsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

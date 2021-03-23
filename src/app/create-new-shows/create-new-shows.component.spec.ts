import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewShowsComponent } from './create-new-shows.component';

describe('CreateNewShowsComponent', () => {
  let component: CreateNewShowsComponent;
  let fixture: ComponentFixture<CreateNewShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewShowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallShowsByDateComponent } from './hall-shows-by-date.component';

describe('HallShowsByDateComponent', () => {
  let component: HallShowsByDateComponent;
  let fixture: ComponentFixture<HallShowsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallShowsByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallShowsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

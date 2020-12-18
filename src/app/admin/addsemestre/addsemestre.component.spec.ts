import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsemestreComponent } from './addsemestre.component';

describe('AddsemestreComponent', () => {
  let component: AddsemestreComponent;
  let fixture: ComponentFixture<AddsemestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsemestreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

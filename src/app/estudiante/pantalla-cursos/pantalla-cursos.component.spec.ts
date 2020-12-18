import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCursosComponent } from './pantalla-cursos.component';

describe('PantallaCursosComponent', () => {
  let component: PantallaCursosComponent;
  let fixture: ComponentFixture<PantallaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

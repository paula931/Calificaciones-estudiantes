import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEstudiantesComponent } from './crud-estudiantes.component';

describe('CrudEstudiantesComponent', () => {
  let component: CrudEstudiantesComponent;
  let fixture: ComponentFixture<CrudEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

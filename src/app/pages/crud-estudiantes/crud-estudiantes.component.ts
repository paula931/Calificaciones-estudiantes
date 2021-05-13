import { Component, OnInit, Input } from '@angular/core';
import { Estudiante } from '../../models/estudiantes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from '../../services/estudiantes.service';

const reg = /^\d*(?:[.,]\d{1,2})?$/;
@Component({
  selector: 'pagl-crud-estudiantes',
  templateUrl: './crud-estudiantes.component.html',
  styleUrls: ['./crud-estudiantes.component.css'],
})
export class CrudEstudiantesComponent implements OnInit {
  @Input()
  estudiante!: Estudiante;
  public estudianteForm: FormGroup;

  public get nombre() {
    return this.estudianteForm.get('nombre');
  }
  public get apellido() {
    return this.estudianteForm.get('apellido');
  }
  public get cedula() {
    return this.estudianteForm.get('cedula');
  }
  public get nota1() {
    return this.estudianteForm.get('nota1');
  }
  public get nota2() {
    return this.estudianteForm.get('nota2');
  }
  public get nota3() {
    return this.estudianteForm.get('nota3');
  }
  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]'),
      ]),
      nota1: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-5]\d*)?$/),
        Validators.pattern(reg),
      ]),
      nota2: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-5]\d*)?$/),
        Validators.pattern(reg),
      ]),
      nota3: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-5]\d*)?$/),
        Validators.pattern(reg),
      ]),
    });
  }

  constructor(private estudianteServices: EstudiantesService) {
    this.estudianteForm = this.createFormGroup();
  }

  ngOnInit(): void {
    console.log(this.estudiante);
  }
  resetForm() {
    this.estudianteForm.reset();
  }
  update(): void {
    let suma =
    Number(this.estudiante.nota1!) +
    Number(this.estudiante.nota2!) +
    Number(this.estudiante.nota3!);
    let promedio = suma / 3;
    let deciamles = Number(promedio.toFixed(2));
    this.estudiante.promedio = deciamles;
    this.estudianteServices.putEStudiante(this.estudiante).subscribe();
  }
  
}

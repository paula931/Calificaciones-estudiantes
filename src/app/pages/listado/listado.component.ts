import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { Estudiante } from '../../models/estudiantes';

const reg = /^\d*(?:[.,]\d{1,2})?$/;

@Component({
  selector: 'pagl-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudiante!: Estudiante;
  seleccionar(item: Estudiante): void {
    this.estudiante = item;
  }
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
      cedula: new FormControl('', [Validators.required]),
      nota1: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-5]'),
        Validators.pattern(reg),
      ]),
      nota2: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-5]'),
        Validators.pattern(reg),
      ]),
      nota3: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-5]'),
        Validators.pattern(reg),
      ]),
    });
  }
  resetForm() {
    this.estudianteForm.reset();
  }
  constructor(private estuduantesServices: EstudiantesService) {
    this.estudianteForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getEstudiantes();
  }
  getEstudiantes(): void {
    this.estuduantesServices
      .getEstudiantes()
      .subscribe((resp) => (this.estudiantes = resp));
  }
  postEstudiante(
    nombre: string,
    apellido: string,
    cedula: string,
    nota1: string,
    nota2: string,
    nota3: string
  ): void {
    nombre = nombre.trim();
    apellido = apellido.trim();
    let suma: number = Number(nota1) + Number(nota2) + Number(nota3);
    let promedio = Number(suma / 3.0).toFixed(2);
    if (!nombre) {
      console.error('invalido');
    }
    this.estuduantesServices
      .postEstudiante(({
        nombre,
        apellido,
        cedula,
        nota1,
        nota2,
        nota3,
        promedio,
      } as unknown) as Estudiante)
      .subscribe((x) => {
        this.estudiantes.push(x);
      });
    this.resetForm();
    console.log(`suma: ${suma} promedio= ${promedio}`);
  }
  delete(estudiante: Estudiante): void {
    this.estudiantes = this.estudiantes.filter((x) => x !== estudiante);
    this.estuduantesServices.deleteEstudiante(estudiante).subscribe();
  }
}

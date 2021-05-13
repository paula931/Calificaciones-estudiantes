import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiantes';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDataService {
  constructor() {}
  createDb() {
    const estudiantes = [
      {
        id: 90117032,
        nombre: 'Paula Andrea',
        apellido: 'Gutierrez',
        cc: '123456789',
        pParcial: 4.0,
        sParcial: 3.0,
        tParcial: 4.5,
        promedio: 4.5,
      },
      {
        id: 90117013,
        nombre: 'Julian',
        apellido: 'Velasco',
        cc: '1083913545',
        pParcial: 5.0,
        sParcial: 5.0,
        tParcial: 5.0,
        promedio: 5.0,
      },
      {
        id: 90117001,
        nombre: 'Ana Maria',
        apellido: 'Villani',
        cc: '918273645',
        pParcial: 1.0,
        sParcial: 3.0,
        tParcial: 0.0,
        promedio: 1.0,
      },
      {
        id: 90117026,
        nombre: 'Juan camilo',
        apellido: 'Cando',
        cc: '10029374',
        pParcial: 5.0,
        sParcial: 4.5,
        tParcial: 3.5,
        promedio: 4.5,
      },
      {
        id: 90117045,
        nombre: 'Andres Felipe ',
        apellido: 'Ortiz',
        cc: '193027452',
        pParcial: 5.0,
        sParcial: 4.0,
        tParcial: 4.5,
        promedio: 4.5,
      },
    ];
    return { estudiantes };
  }
  getEstudianteId(estudiantes: Estudiante[]): Number {
    return estudiantes.length > 0
      ? Math.max(...estudiantes.map((resp) => resp.id!)) + 1
      : 11;
  }
}

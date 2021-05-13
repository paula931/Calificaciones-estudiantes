import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiante } from '../models/estudiantes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private estudiantesUrl = 'api/estudiantes';

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', resullt?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message} `);
      return of(resullt as T);
    };
  }
  private registro(mensaje: string) {
    alert(` EquiposService: ${mensaje}`);
  }

  //Traer la colección de estudiantes
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.estudiantesUrl).pipe(
      tap((_) => console.log('Ok')),
      catchError(this.handleError<Estudiante[]>('Error get equipos', []))
    );
  }
  getEstudiante(id: number): Observable<Estudiante> {
    const url = `${this.estudiantesUrl}/${id}`;
    return this.http.get<Estudiante>(url).pipe(
      tap((_) => this.registro(`Estudiante ${id} encontrado`)),
      catchError(this.handleError<Estudiante>(`Error `))
    );
  }
  //leer url
  httpOptons = {
    headers: new HttpHeaders({ 'Content-Type': 'aplication/-json' }),
  };

  putEStudiante(estudiante: Estudiante): Observable<any> {
    return this.http.put(this.estudiantesUrl, estudiante, this.httpOptons).pipe(
      tap((_) => alert(`Estudiante ${estudiante.cedula} actualizado`)),
      catchError(this.handleError<any>('Eror al actualizar'))
    );
  }
  postEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http
      .post<Estudiante>(this.estudiantesUrl, estudiante, this.httpOptons)
      .pipe(
        tap((nuevoEs: Estudiante) =>
          this.registro(
            `Estudiante ${nuevoEs.id} creado con promedio de = ${nuevoEs.promedio} `
          )
        ),
        catchError(this.handleError<Estudiante>('no se puede crear estudiante'))
      );
  }

  deleteEstudiante(estudiante: Estudiante | number): Observable<Estudiante> {
    const id = typeof estudiante == 'number' ? estudiante : estudiante.id;
    const url = `${this.estudiantesUrl}/${id}`;
    return this.http.delete<Estudiante>(url, this.httpOptons).pipe(
      tap((_) => this.registro(`Estudiante ${id} eliminado`)),
      catchError(this.handleError<Estudiante>(`Error borrando = ${id}`))
    );
  }
  getNombreApellido(termino: string): Observable<Estudiante[]> {
    console.log(termino);
    const url = `${this.estudiantesUrl}/${termino}`;
    if (!termino.trim()) {
      return of([]);
    }

    return this.http
      .get<Estudiante[]>(url)
      .pipe(
        tap(
          (x) =>
            x.length
              ? console.log('encontrado')
              : this.registro('Estudiante no registrado'),
          catchError(
            this.handleError<Estudiante[]>('no se  encuentra el estudiante')
          )
        )
      );
  }
}

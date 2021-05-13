import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Estudiante } from '../../models/estudiantes';

@Component({
  selector: 'pagl-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent implements OnInit {
  estudiante$?: Observable<Estudiante[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private route: ActivatedRoute,
    public serviceEstudiantes: EstudiantesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      var termino = params['termino'];
      console.log(termino);
      this.searchTerms.next(termino);
      console.log(this.searchTerms);
      this.estudiante$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((termino: string) =>
          this.serviceEstudiantes.getNombreApellido(termino)
        )
      );
    });
  }
}

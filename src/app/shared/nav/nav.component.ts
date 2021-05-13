import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'pagl-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private estudianteService: EstudiantesService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  search(termino: string) {
    if (termino.length < 1) {
      return;
    } else {
      console.log(termino);
      this.route.navigate(['estudiante', termino]);
    }
  }
}

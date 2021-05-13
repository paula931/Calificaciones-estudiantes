import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { CrudEstudiantesComponent } from './pages/crud-estudiantes/crud-estudiantes.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  { path: 'listado', component: ListadoComponent },
  { path: 'estudiante/:termino', component: BusquedaComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/listado', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

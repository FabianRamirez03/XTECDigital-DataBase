import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListacursosComponent } from './admin/listacursos/listacursos.component';
import { SemestreComponent } from './admin/semestre/semestre.component';
import { AddsemestreComponent } from './admin/addsemestre/addsemestre.component';
import { AddProfesorComponent } from './admin/add-profesor/add-profesor.component';
import { AddEstudianteComponent } from './admin/add-estudiante/add-estudiante.component';
import {FilesComponent} from './componentes/files/files.component';
import { NotasComponent } from './estudiante/notas/notas.component';
import { NoticiasComponent } from './estudiante/noticias/noticias.component';
import {EvaluarComponent} from './profesor/evaluar/evaluar.component';
import {ListaEstudiantesComponent} from './profesor/lista-estudiantes/lista-estudiantes.component';
import {ReporteNotasComponent} from './profesor/reporte-notas/reporte-notas.component';
import { RubrosComponent } from './profesor/rubros/rubros.component';
import { AsignacionesComponent } from './profesor/asignaciones/asignaciones.component';
import { AddNoticiaComponent } from './profesor/add-noticia/add-noticia.component';
import {PantallaCursosComponent} from './estudiante/pantalla-cursos/pantalla-cursos.component';
import {ListaCursosComponent} from './profesor/lista-cursos/lista-cursos.component';

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path: 'Login', component: LoginComponent},  // listo
  {path: 'ListaCursos', component: ListacursosComponent},  // listo
  {path: 'Files', component: FilesComponent},  // Wajo
  {path: 'Semestre', component: SemestreComponent},  // listo
  {path: 'Grupos', component: AddsemestreComponent}, // Listo
  {path: 'AddProfesor', component: AddProfesorComponent},
  {path: 'AddEstudiante', component: AddEstudianteComponent},
  {path: 'NotasEstudiante', component: NotasComponent},
  {path: 'Noticias', component: NoticiasComponent},
  {path: 'Evaluar', component: EvaluarComponent},
  {path: 'ListaEstudiantes', component: ListaEstudiantesComponent},
  {path: 'ReporteNotas', component: ReporteNotasComponent},
  {path: 'Asignaciones', component: AsignacionesComponent},
  {path: 'Rubros', component: RubrosComponent},
  {path: 'AddNoticia', component: AddNoticiaComponent},
  {path: 'PantallaCursos', component: PantallaCursosComponent},
  {path: 'MisCursos', component: ListaCursosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// @ts-ignore
export const routingComponents = [LoginComponent, ListacursosComponent, SemestreComponent, AddsemestreComponent, AddProfesorComponent,
  AddEstudianteComponent, NotasComponent, NoticiasComponent, ListaEstudiantesComponent, EvaluarComponent,
  ReporteNotasComponent, AsignacionesComponent, RubrosComponent, AddNoticiaComponent, PantallaCursosComponent, ListaCursosComponent];

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
  {path: 'Login', component: LoginComponent},  // listo x2
  {path: 'ListaCursos', component: ListacursosComponent},  // listo x2
  {path: 'Files', component: FilesComponent}, // listo x2
  {path: 'Semestre', component: SemestreComponent},  // listo x2
  {path: 'Grupos', component: AddsemestreComponent}, // Listo x2
  {path: 'AddProfesor', component: AddProfesorComponent}, // Listo x2
  {path: 'AddEstudiante', component: AddEstudianteComponent}, // Listo x2
  {path: 'NotasEstudiante', component: NotasComponent},
  {path: 'Noticias', component: NoticiasComponent},  // Listo x2
  {path: 'Evaluar', component: EvaluarComponent},
  {path: 'ListaEstudiantes', component: ListaEstudiantesComponent}, // Listo x2
  {path: 'ReporteNotas', component: ReporteNotasComponent},  //  Listo x2
  {path: 'Asignaciones', component: AsignacionesComponent},
  {path: 'Rubros', component: RubrosComponent},
  {path: 'AddNoticia', component: AddNoticiaComponent}, // Lista x2
  {path: 'PantallaCursos', component: PantallaCursosComponent}, // Listo x2
  {path: 'MisCursos', component: ListaCursosComponent} // Listo x2
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

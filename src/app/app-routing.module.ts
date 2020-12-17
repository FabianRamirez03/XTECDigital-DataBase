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

const routes: Routes = [
  {path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path: 'Login', component: LoginComponent},
  {path: 'ListaCursos', component: ListacursosComponent},
  {path: 'Files', component: FilesComponent},
  {path: 'Semestre', component: SemestreComponent},
  {path: 'AddSemestre', component: AddsemestreComponent},
  {path: 'AddProfesor', component: AddProfesorComponent},
  {path: 'AddEstudiante', component: AddEstudianteComponent},
  {path: 'NotasEstudiante', component: NotasComponent},
  {path: 'Noticias', component: NoticiasComponent},
  {path: 'Evaluar', component: EvaluarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// @ts-ignore
export const routingComponents = [LoginComponent, ListacursosComponent, SemestreComponent, AddsemestreComponent, AddProfesorComponent,
  AddEstudianteComponent, NotasComponent, NoticiasComponent];

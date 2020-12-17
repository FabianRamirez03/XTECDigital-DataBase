import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListacursosComponent } from './admin/listacursos/listacursos.component';
import { SemestreComponent } from './admin/semestre/semestre.component';
import { AddsemestreComponent } from './admin/addsemestre/addsemestre.component';
import { AddProfesorComponent } from './admin/add-profesor/add-profesor.component';
import { AddEstudianteComponent } from './admin/add-estudiante/add-estudiante.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MessengerService} from './MessengerService';
// @ts-ignore
import {
  DetailsViewService,
  FileManagerModule,
  NavigationPaneService,
  ToolbarService
} from '@syncfusion/ej2-angular-filemanager';
import { FilesComponent } from './componentes/files/files.component';
import { NotasComponent } from './estudiante/notas/notas.component';
import { NoticiasComponent } from './estudiante/noticias/noticias.component';
import { RubrosComponent } from './profesor/rubros/rubros.component';
import { AsignacionesComponent } from './profesor/asignaciones/asignaciones.component';
import { AddNoticiaComponent } from './profesor/add-noticia/add-noticia.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    ListacursosComponent,
    SemestreComponent,
    AddsemestreComponent,
    AddProfesorComponent,
    AddEstudianteComponent,
    ListacursosComponent,
    FilesComponent,
    NotasComponent,
    NoticiasComponent,
    RubrosComponent,
    AsignacionesComponent,
    AddNoticiaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FileManagerModule,

    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService, MessengerService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [AddProfesorComponent,
    AddEstudianteComponent, AsignacionesComponent]
})
export class AppModule { }

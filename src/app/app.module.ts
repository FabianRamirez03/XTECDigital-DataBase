import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListacursosComponent } from './admin/listacursos/listacursos.component';
import {
  DetailsViewService,
  FileManagerModule,
  NavigationPaneService,
  ToolbarService
} from '@syncfusion/ej2-angular-filemanager';
import { FormsModule } from '@angular/forms';
import { FilesComponent } from './componentes/files/files.component';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginComponent,
    ListacursosComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FileManagerModule,

  ],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  bootstrap: [AppComponent]
})
export class AppModule { }

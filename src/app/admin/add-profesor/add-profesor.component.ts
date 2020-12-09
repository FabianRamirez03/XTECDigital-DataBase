import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.scss']
})
export class AddProfesorComponent implements OnInit {
  profesoreSemestre: any;
  profesores: any;
  constructor() {
    this.profesores = [
      {nombre: 'Barboza'
      }, {nombre: 'Pablito'}];
    this.profesoreSemestre = [
      {nombre: 'Milton'
      }, {nombre: 'Montero'}];
  }
  ngOnInit(): void {
  }
  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }
}

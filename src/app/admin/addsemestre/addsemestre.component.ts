import { Component, OnInit } from '@angular/core';
import {AddEstudianteComponent} from '../add-estudiante/add-estudiante.component';
import {AddProfesorComponent} from '../add-profesor/add-profesor.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-addsemestre',
  templateUrl: './addsemestre.component.html',
  styleUrls: ['./addsemestre.component.scss']
})
export class AddsemestreComponent implements OnInit {
  cursosSemestre: any;
  cursos: any;
  constructor(public dialog: MatDialog) {
    this.cursos = [{nombre: 'bases'},{nombre: 'senales'},{nombre: 'anpi'}];
    this.cursosSemestre = [
      {grupo: '1',
        curso: 'bases'
      }, {grupo: '432',
        curso: 'ca',}];
  }

  ngOnInit(): void {
  }
  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }

  estudianteDialog(): void {
    const param = [null];
    const dialogRef = this.dialog.open(AddEstudianteComponent, {
      width: '70%',
      height: '70%',
      data: param,
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    });
    dialogRef.afterClosed().subscribe(res => {console.log(res); });
  }
  profesorDialog(): void {
    const param = [null];
    const dialogRef = this.dialog.open(AddProfesorComponent, {
      width: '70%',
      height: '70%',
      data: param,
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    });
    dialogRef.afterClosed().subscribe(res => {console.log(res); });
  }

}

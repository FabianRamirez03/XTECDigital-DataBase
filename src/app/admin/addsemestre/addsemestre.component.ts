import { Component, OnInit } from '@angular/core';
import {AddEstudianteComponent} from '../add-estudiante/add-estudiante.component';
import {AddProfesorComponent} from '../add-profesor/add-profesor.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';

@Component({
  selector: 'app-addsemestre',
  templateUrl: './addsemestre.component.html',
  styleUrls: ['./addsemestre.component.scss']
})
export class AddsemestreComponent implements OnInit {
  cursosDisponibles: any;
  cursos: any;
  grupos: any;
  periodo: any;
  ano: any;
  constructor(public dialog: MatDialog, public httpService: HttpClient, public messenger: MessengerService ) {
    // tslint:disable-next-line:prefer-const
  }

  ngOnInit(): void {
    this.messenger.message.subscribe(value => {this.ano = value[0]; });
    this.messenger.message.subscribe(value => {this.periodo = value[1]; });
    console.log(this.ano);
    console.log(this.periodo);
    this.setGruposActivos();
    this.setCursosDisponibles();
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

  setGruposActivos(): void {
    // tslint:disable-next-line:prefer-const
    this.httpService.post('https://localhost:5001/Semestre/verCursosSemestre',
      {
        ano: 2021,
        periodo: '1'
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.grupos = resp;
      }
    );
  }
  setCursosDisponibles(): void {
    // tslint:disable-next-line:prefer-const
    this.httpService.post('https://localhost:5001/Curso/verCursosDisponibles', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.cursosDisponibles = resp;
      }
    );
  }

}

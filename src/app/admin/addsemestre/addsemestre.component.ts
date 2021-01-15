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
  codigo: any;
  numeroGrupo: any;
  ano: any;
  constructor(public dialog: MatDialog, public httpService: HttpClient, public messenger: MessengerService ) {
    // tslint:disable-next-line:prefer-const
  }

  ngOnInit(): void {
    this.messenger.message.subscribe(value => {this.ano = value[0]; });
    this.messenger.message.subscribe(value => {this.periodo = value[1]; });
    this.setGruposActivos();
    this.setCursosDisponibles();
  }
  agregarCursoSemestre(): void{
    this.httpService.post(this.messenger.urlServer + 'Curso/agregarCursoSemestre',
      {
        codigoCurso: this.codigo,
        ano: +this.ano,
        periodo: this.periodo
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        console.log(resp);
      }
    );
  }
  async agregar(): Promise<void> {
    this.codigo = (document.getElementById('codigo') as HTMLInputElement).value;
    this.numeroGrupo = (document.getElementById('grupo') as HTMLInputElement).value;
    await this.agregarCursoSemestre();
    await this.httpService.post(this.messenger.urlServer + 'Grupo/crearGrupo',
      {
        codigoCurso: this.codigo,
        numeroGrupo: +this.numeroGrupo,
        ano: +this.ano,
        periodo: this.periodo
      }).subscribe(
      (resp: HttpResponse<any>) => {
        this.ngOnInit();
      }
    );
  }
  eliminar(): void{
    console.log('eliminado');
  }

  estudianteDialog(codigoCurso: string, numeroGrupo): void {
    const param = {codigo: codigoCurso, numero: +numeroGrupo, ano: this.ano, periodo: this.periodo};
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
  profesorDialog(codigoCurso: string, numeroGrupo): void {
    const param = {codigo: codigoCurso, numero: +numeroGrupo, ano: this.ano, periodo: this.periodo};
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
    this.httpService.post(this.messenger.urlServer + 'Semestre/verCursosSemestre',
      {
        ano: +this.ano,
        periodo: this.periodo
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.grupos = resp;
      }
    );
  }
  setCursosDisponibles(): void {
    // tslint:disable-next-line:prefer-const
    this.httpService.post(this.messenger.urlServer + 'Curso/verCursosDisponibles', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.cursosDisponibles = resp;
      }
    );
  }

}

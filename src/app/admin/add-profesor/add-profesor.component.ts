import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.scss']
})
export class AddProfesorComponent implements OnInit {
  profesoreSemestre: any;
  profesores: any;
  profesoresCursos: any;
  cedulaProfesor: any;
  // tslint:disable-next-line:max-line-length
  constructor(public httpService: HttpClient, public messenger: MessengerService,  @Inject(MAT_DIALOG_DATA) public data: {codigo: string, numero, ano: string, periodo: string}) {
  }
  ngOnInit(): void {
    this.setProfesores();
    this.setProfesoresCurso();
    console.log({
      ano: this.data.ano,
      periodo: this.data.periodo,
      grupo: this.data.numero,
      codigoCurso: this.data.codigo
    });
  }
  agregar(): void{
    this.cedulaProfesor = (document.getElementById('profesor') as HTMLInputElement).value;
    this.httpService.post(this.messenger.urlServer + 'Usuario/asignarProfesorGrupo',
      {
        cedulaProfesor: this.cedulaProfesor,
        codigoCurso: this.data.codigo,
        numeroGrupo: this.data.numero,
        ano: +this.data.ano,
        periodo: this.data.periodo
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        console.log(resp);
      }
    );
  }
  eliminar(): void{
    console.log('eliminado');
  }

  setProfesores(): void{
    this.httpService.post(this.messenger.urlServer + 'Usuario/getNombreProfesores', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.profesores = resp;
      }
    );
  }

  setProfesoresCurso(): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/verProfesorSemestre',
      {
        ano: +this.data.ano,
        periodo: this.data.periodo,
        grupo: this.data.numero,
        codigoCurso: this.data.codigo
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.profesoresCursos = resp;
      }
    );
  }

}

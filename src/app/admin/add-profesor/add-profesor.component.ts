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
  cedulaProfesor: any;
  // tslint:disable-next-line:max-line-length
  constructor(public httpService: HttpClient, public messenger: MessengerService,  @Inject(MAT_DIALOG_DATA) public data: {codigo: string, numero}) {
    this.profesoreSemestre = [
      {nombre: 'Milton'
      }, {nombre: 'Montero'}];
  }
  ngOnInit(): void {
    this.setProfesores();
  }
  agregar(): void{
    this.cedulaProfesor = (document.getElementById('profesor') as HTMLInputElement).value;
    this.httpService.post(this.messenger.urlServer + 'Usuario/asignarProfesorGrupo',
      {
        cedulaProfesor: this.cedulaProfesor,
        codigoCurso: this.data.codigo,
        numeroGrupo: this.data.numero
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
}

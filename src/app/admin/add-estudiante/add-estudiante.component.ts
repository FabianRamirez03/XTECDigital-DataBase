import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.scss']
})
export class AddEstudianteComponent implements OnInit {
  estudiantes: any;
  carnetEstudiante: any;

  estudianteSemestre: any;
  // tslint:disable-next-line:max-line-length
  constructor(public httpService: HttpClient, public messenger: MessengerService, @Inject(MAT_DIALOG_DATA) public data: {codigo: string, numero, ano: string, periodo: string}) {
    this.estudianteSemestre = [
      {carnet: '123',
        nombre: 'mariana'
      }, {carnet: '432',
      nombre: 'katherine'}];
  }

  ngOnInit(): void {
    this.setEstudiantes();
    console.log(this.data);
  }

  agregar(): void{
    this.carnetEstudiante = (document.getElementById('estudiante') as HTMLInputElement).value;
    console.log({
      carnet: this.carnetEstudiante,
      codigoCurso: this.data.codigo,
      numeroGrupo: this.data.numero
    });
    this.httpService.post(this.messenger.urlServer + 'Usuario/agregarEstudiantesGrupo',
      {
        carnet: this.carnetEstudiante,
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

  setEstudiantes(): void{
    this.httpService.post(this.messenger.urlServer + 'Usuario/getNombreEstudiantes', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.estudiantes = resp;
        console.log(resp);
      }
    );
  }

  setEstudiantesInscritos(): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/verProfesorSemestre',
      {
        ano: +this.data.ano,
        periodo: this.data.periodo,
        grupo: this.data.numero,
        codigoCurso: this.data.codigo
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.estudianteSemestre = resp;
      }
    );
  }

}

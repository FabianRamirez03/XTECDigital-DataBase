import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.scss']
})
export class AddEstudianteComponent implements OnInit {
  estudiantes: any;
  estudianteSemestre: any;
  constructor(public httpService: HttpClient, public messenger: MessengerService) {
    this.estudianteSemestre = [
      {carnet: '123',
        nombre: 'mariana'
      }, {carnet: '432',
      nombre: 'katherine'}];
  }

  ngOnInit(): void {
    this.setEstudiantes();
  }

  agregar(): void{
    console.log('agregado');
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

}

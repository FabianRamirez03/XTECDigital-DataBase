import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';


@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.scss']
})
export class AddProfesorComponent implements OnInit {
  profesoreSemestre: any;
  profesores: any;
  constructor(public httpService: HttpClient, public messenger: MessengerService) {
    this.profesoreSemestre = [
      {nombre: 'Milton'
      }, {nombre: 'Montero'}];
  }
  ngOnInit(): void {
    this.setProfesores();
  }
  agregar(): void{
    console.log('agregado');
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

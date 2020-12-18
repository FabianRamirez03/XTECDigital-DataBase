import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {
  misGrupos: any;
  constructor(public httpService: HttpClient, public messenger: MessengerService) { }

  ngOnInit(): void {
    this.setMisGrupos();
  }

  setMisGrupos(): void{
    this.httpService.post(this.messenger.urlServer + 'Usuario/verCursosProfesor', {
      cedula: this.messenger.usuario.carnet
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.misGrupos = resp;
      }
    );
  }

}

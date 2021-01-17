import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {
  misGrupos: any;
  constructor(public httpService: HttpClient, public messenger: MessengerService, private router: Router) { }

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

  verDetalles(nombre, grupo, ano, periodo, codigo): void{
    this.messenger.curso = {
      nombre,
      grupo,
      ano,
      periodo,
      codigo
    };
    this.router.navigate(['/', 'ListaEstudiantes']);
  }
}

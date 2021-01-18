import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: any;
  misNoticias: any;
  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router ) {
    this.noticias = [{profesor: 'Milton Villegas',
    comunicado: 'bla bla bla',
    fecha: '12/3/2020',
    grupo: '1',
    titulo: 'Proyecto',
    curso: 'Intro'},
      {profesor: 'Milton Villegas',
        comunicado: 'bla bla bla',
        fecha: '12/3/2020',
        grupo: '1',
        titulo: 'Proyecto de entrega ',
        curso: 'Intro'}];
  }

  ngOnInit(): void {
    this.setMisNoticias();
  }


  setMisNoticias(): void{
    this.httpService.post(this.messenger.urlServer + 'Noticias/verTodasNoticiasEstudiante', {
      carnet: this.messenger.usuario.carnet
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.misNoticias = resp;
        console.log(resp);
      }
    );
  }
}

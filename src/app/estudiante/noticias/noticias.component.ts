import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  noticias: any;
  constructor() {
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
  }

}

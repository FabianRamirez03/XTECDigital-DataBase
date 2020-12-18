import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-noticia',
  templateUrl: './add-noticia.component.html',
  styleUrls: ['./add-noticia.component.scss']
})
export class AddNoticiaComponent implements OnInit {
  noticias: any;
  cursos: any;
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
    this.cursos = [{nombre: 'bases'}, {nombre: 'senales'}, {nombre: 'anpi'}];
  }

  ngOnInit(): void {
  }

  eliminar(): void{
    console.log('eliminado');
  }

}

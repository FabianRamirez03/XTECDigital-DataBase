import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listacursos',
  templateUrl: './listacursos.component.html',
  styleUrls: ['./listacursos.component.scss']
})
export class ListacursosComponent implements OnInit {
  cursos: any;
  constructor() {
    this.cursos = [
      {codigo: '123',
        nombre: 'bases',
        creditos: '4',
        carrera: 'computadores'
    }, {codigo: '432',
        nombre: 'ca',
        creditos: '4',
        carrera: 'electronica'}];
  }

  ngOnInit(): void {
  }
  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }

}

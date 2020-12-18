import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.scss']
})
export class AddEstudianteComponent implements OnInit {
  estudiantes: any;
  estudianteSemestre: any;
  constructor() {
    this.estudiantes = [
      {carnet: '456'
      }, {carnet: '987'}];
    this.estudianteSemestre = [
      {carnet: '123',
        nombre: 'mariana'
      }, {carnet: '432',
      nombre: 'katherine'}];
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

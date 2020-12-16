import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  rubros: any;
  notaFinal: any;
  constructor() {
    this.rubros = [
      {nombre: 'Quiz',
        notagen: '70',
        asignaciones: [{
        nombre: 'Quiz 1',
        nota: '80'
        },
          {
            nombre: 'Quiz 2',
            nota: '50'
          }]
      }, {nombre: 'Examenes',
        notagen: '60',
        asignaciones: [{
          nombre: 'Examen 1',
          nota: '70'
        },
          {
            nombre: 'Examen 2',
            nota: '50'
          }]
      }];
    this.notaFinal = 70;
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  rubros: any;
  notaFinal: any;
  imageByte: string;
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
  setByteArray(files): void {
    const reader = new FileReader();
    // this.profile.image = files;
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      const bytes = reader.result;
      this.imageByte = bytes.toString();
    };
  }
}

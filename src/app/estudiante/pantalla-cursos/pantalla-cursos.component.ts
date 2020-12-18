import { Component, OnInit } from '@angular/core';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-pantalla-cursos',
  templateUrl: './pantalla-cursos.component.html',
  styleUrls: ['./pantalla-cursos.component.scss']
})
export class PantallaCursosComponent implements OnInit {
  cursos = [{nombre: 'Bases de datos', grupo: 2}, {nombre: 'Calculo superior', grupo: 1}, {nombre: 'Quimica 2', grupo: 5}];
  constructor() { }

  ngOnInit(): void {
  }

}

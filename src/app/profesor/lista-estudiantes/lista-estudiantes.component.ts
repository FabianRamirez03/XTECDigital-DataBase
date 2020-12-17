import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.scss']
})
export class ListaEstudiantesComponent implements OnInit {
  nombreCurso = 'Bases de Datos';
  grupo = 1;
  estudiantes = [{primernombre: 'Mariana', apellidos: 'Vargas Ramirez', carnet: 2018086985}, {primernombre: 'Mario Alexis', apellidos: 'Araya Chacon', carnet: 2018319178}];
  constructor() { }

  ngOnInit(): void {
  }

  openPDFCategorias(): void {
    const doc = new jsPDF();
    doc.setFontSize(40);
    doc.text(this.nombreCurso, 50, 15);
    doc.setFontSize(20);
    doc.text('Grupo: ' + this.grupo.toString(), 20, 25);
    doc.text('Estudiantes:', 20, 35);
    autoTable(doc, {
      html: '#estudiantes',
      startY: 45,
    });
    doc.save('Estudiantes ' + this.nombreCurso + '.pdf');
  }

}

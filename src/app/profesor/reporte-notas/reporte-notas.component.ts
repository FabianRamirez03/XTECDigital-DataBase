import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-notas',
  templateUrl: './reporte-notas.component.html',
  styleUrls: ['./reporte-notas.component.scss']
})
export class ReporteNotasComponent implements OnInit {
  nombreCurso = 'Bases de Datos';
  grupo = 1;
  estudiantes = [{primernombre: 'Mariana', apellidos: 'Vargas Ramirez',
    carnet: 2018086985, rubro: 'Examenes', nombreEvaluacion: 'Parcial 1', porcentajeObtenido: 10, notaObtenida: 50,
    porcentajeEvaluacion: 20, notaFinal: 40},
    {primernombre: 'Mario', apellidos: 'Araya Chacon',
    carnet: 2018319178, rubro: 'Examenes', nombreEvaluacion: 'Parcial 1', porcentajeObtenido: 20, notaObtenida: 100,
    porcentajeEvaluacion: 20, notaFinal: 90}];
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
    doc.save('Notas ' + this.nombreCurso + '.pdf');
  }
}

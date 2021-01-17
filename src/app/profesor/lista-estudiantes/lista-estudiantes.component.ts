import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.scss']
})
export class ListaEstudiantesComponent implements OnInit {
  nombreCurso = 'Bases de Datos';
  grupo = 1;
  estudiantes: any;
  constructor(public httpService: HttpClient, public messenger: MessengerService) { }

  ngOnInit(): void {
    this.setEstudiantes();
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


  setEstudiantes(): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/verEstudiantesGrupo',
      {
        ano: +this.messenger.curso.ano,
        periodo: this.messenger.curso.periodo,
        grupo: this.messenger.curso.grupo,
        codigoCurso: this.messenger.curso.codigo
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.estudiantes = resp;
        console.log(resp);
      }
    );
  }

}

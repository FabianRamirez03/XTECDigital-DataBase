import { Component, OnInit } from '@angular/core';
import {AddEstudianteComponent} from '../add-estudiante/add-estudiante.component';
import {AddProfesorComponent} from '../add-profesor/add-profesor.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-semestre',
  templateUrl: './semestre.component.html',
  styleUrls: ['./semestre.component.scss']
})
export class SemestreComponent implements OnInit {
  respuesta: any;
  semestres: any;
  ano: any;
  periodo: any;
  cedulaAdmin: any;
  constructor(public dialog: MatDialog, public httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.setSemestres();
  }
  agregar(): void{
    this.ano = (document.getElementById('ano') as HTMLInputElement).value;
    this.periodo = (document.getElementById('periodo') as HTMLInputElement).value;
    this.cedulaAdmin = '11111';
    this.httpService.post('https://localhost:5001/Semestre/crearSemestre',
      {
        // tslint:disable-next-line:radix
        ano: parseInt(this.ano),
        periodo: this.periodo,
        cedulaAdmin: this.cedulaAdmin
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.respuesta = resp;
        // tslint:disable-next-line:triple-equals
        if (resp[0].respuesta != 'error'){
          this.ngOnInit();
        }else{
          alert(resp[0].error);
        }
      }
    );
    this.ngOnInit();
  }
  eliminar(): void{
    console.log('eliminado');
  }


  setSemestres(): void{
    this.httpService.post('https://localhost:5001/Semestre/verSemestres', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.semestres = resp;
        console.log(resp);
      }
    );
  }

}

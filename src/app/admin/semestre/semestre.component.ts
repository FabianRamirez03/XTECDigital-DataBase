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
  semestres: any;
  constructor(public dialog: MatDialog, public httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.setSemestres();
  }
  agregar(): void{
    console.log('agregado');
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

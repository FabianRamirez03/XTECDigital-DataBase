import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-listacursos',
  templateUrl: './listacursos.component.html',
  styleUrls: ['./listacursos.component.scss']
})
export class ListacursosComponent implements OnInit {
  cursos: any;
  constructor(public httpService: HttpClient) {
  }

  setCursos(): void{
    this.httpService.post('https://localhost:5001/Curso/verCursos', {}).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.cursos = resp;
        console.log(resp);
      }
      );
  }

  ngOnInit(): void {
    this.setCursos();
  }
  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }

}

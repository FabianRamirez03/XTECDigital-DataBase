import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  rubros: any;
  imageByte: string;
  misRubros;
  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router) {
  }

  ngOnInit(): void {
    this.verNotasEstudianteGrupo();
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

  verNotasEstudianteGrupo(): void{
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/verNotasEstudianteGrupo', {
      carnet: this.messenger.usuario.carnet,
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: this.messenger.curso.grupo,
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.misRubros = resp;
        console.log(resp);
      }
    );
  }
  public uploadFile = (files, rubro, nombreEvaluacion) => {
    const file = files.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.httpService.post(this.messenger.urlServer + 'Evaluacion/subirEvaluacion', {
        nombArch: file.name,
        archivo: reader.result,
        carnet: this.messenger.usuario.carnet,
        codigoCurso: this.messenger.curso.codigo,
        numeroGrupo: this.messenger.curso.grupo,
        rubro,
        nombreEvaluacion
      }, {reportProgress: true, observe: 'events'})
        .subscribe(event => {
           alert('Archivo ' + file.name + ' subido con exito');
        });
    };
    if (files.length === 0) {
      return;
    }
  }

  descargarSol(rubro, nombreEvaluacion): any{
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/obtenerArchivoSolucion', {
      carnet: this.messenger.usuario.carnet,
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: this.messenger.curso.grupo,
      rubro,
      nombreEvaluacion
    }, {responseType: 'blob'}).subscribe((resp: any) => {
      saveAs(resp, `solucion.pdf`);
    });
  }
  descargarAsign(rubro, nombreEvaluacion): any{
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/obtenerArchivoEvaluacion', {
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: this.messenger.curso.grupo,
      rubro,
      nombreEvaluacion
    }, {responseType: 'blob'}).subscribe((resp: any) => {
      saveAs(resp, `asignacion.pdf`);
    });
  }


}

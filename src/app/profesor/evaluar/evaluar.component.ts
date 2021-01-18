import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss']
})
export class EvaluarComponent implements OnInit {
  rubro = 'Examenes';
  archivo;
  evaluaciones = ['Examen 1', 'Examen 2'];
  misEvaluaciones: any;
  imageByte: string;
  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router) {
  }
  ngOnInit(): void {
    this.setEvaluaciones();
    this.rubro = this.messenger.evaluacion.evaluacion;
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

  setEvaluaciones(): void{
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/verEvaluacionesEstudiantes', {
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: +this.messenger.curso.grupo,
      rubro: this.messenger.evaluacion.rubro,
      nombreEvaluacion: this.messenger.evaluacion.evaluacion
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        // tslint:disable-next-line:triple-equals
        if (resp[0].error != 'null'){
          alert(resp[0].error);
        }else{
          this.misEvaluaciones = resp;
          console.log(resp);
        }
      }
    );
  }

  publicar(carnet): void {
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/revisarEvaluacion', {
      carnet: carnet,
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: this.messenger.curso.grupo,
      rubro: this.messenger.evaluacion.rubro,
      nombreEvaluacion: this.messenger.evaluacion.evaluacion,
      nota: Number(((document.getElementById('nota') as HTMLInputElement).value)),
      comentario: (document.getElementById('comentario') as HTMLInputElement).value,
      archivo: this.archivo
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {alert('Revisado');});
  }
  descargarSol(carnet): any{
    console.log(carnet,this.messenger.curso.codigo,this.messenger.curso.grupo, this.messenger.evaluacion.rubro,this.messenger.evaluacion.evaluacion);
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/obtenerArchivoSolucion', {
      carnet: carnet,
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: this.messenger.curso.grupo,
      rubro: this.messenger.evaluacion.rubro,
      nombreEvaluacion: this.messenger.evaluacion.evaluacion
    }, {responseType: 'blob'}).subscribe((resp: any) => {
      saveAs(resp, `solucion.pdf`);
    });
  }
  uploadFile(files): void {
    const file = files.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.archivo = reader.result;
    };
  }
}

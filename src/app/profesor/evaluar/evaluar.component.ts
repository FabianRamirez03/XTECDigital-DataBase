import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';
@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.scss']
})
export class EvaluarComponent implements OnInit {
  rubro = 'Examenes';
  evaluaciones = ['Examen 1', 'Examen 2'];
  misEvaluaciones: any;
  imageByte: string;
  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router) {
  }
  ngOnInit(): void {
    this.setEvaluaciones();
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

}

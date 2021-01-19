import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';

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
}

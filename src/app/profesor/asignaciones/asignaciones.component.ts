import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {
  asignaciones: any;
  misAsignaciones: any;
  // tslint:disable-next-line:max-line-length
  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: {rubro: string}) {
    this.asignaciones = [
      {nombre: 'Quiz1', fecha: '21/5/202', hora: '21:00',
        peso: '12', especificacion: 'file', personas: '2'
      }, {nombre: 'Quiz2', fecha: '26/5/202', hora: '00:00',
        peso: '20', especificacion: 'file', personas: '3'
      }];
  }

  ngOnInit(): void {
    this.setMisAsignaciones();
  }

  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }
  setMisAsignaciones(): void{
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/verEvaluacionesRubro', {
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: +this.messenger.curso.grupo,
      rubro: this.data.rubro,
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        // tslint:disable-next-line:triple-equals
        if (resp[0].error != 'null'){
          alert(resp[0].error);
        }else{
          this.misAsignaciones = resp;
          console.log(resp);
        }
      }
    );
  }
}

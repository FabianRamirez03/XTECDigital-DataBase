import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {
  asignaciones: any;
  misAsignaciones: any;
  archivo: any;
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
    alert((document.getElementById('nombres') as HTMLInputElement).value)
    this.httpService.post(this.messenger.urlServer + 'Evaluacion/crearEvaluacion', {
      grupal: false,
      nombre: (document.getElementById('nombres') as HTMLInputElement).value,
      porcentaje: Number((document.getElementById('peso') as HTMLInputElement).value),
      fechaInicio: new Date(),
      fechaFin: (document.getElementById('birthDate') as HTMLInputElement).value,
      archivo: this.archivo,
      rubro: this.data.rubro,
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: +this.messenger.curso.grupo,
      cantPersonas: Number((document.getElementById('cantidad') as HTMLInputElement).value)
    }, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
      });
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

  evaluar(evaluacion): void{
    this.messenger.evaluacion = {rubro: this.data.rubro, evaluacion};
    this.router.navigate(['/', 'Evaluar']);
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

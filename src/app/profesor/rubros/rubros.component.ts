import { Component, OnInit } from '@angular/core';
import {AddEstudianteComponent} from '../../admin/add-estudiante/add-estudiante.component';
import {MatDialog} from '@angular/material/dialog';
import {AsignacionesComponent} from '../asignaciones/asignaciones.component';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  rubros: any;
  misRubros: any;
  constructor(public dialog: MatDialog, public httpService: HttpClient, public messenger: MessengerService, private router: Router) {
    this.rubros = [{nombre: 'Examen', porcentaje: '70'}, {nombre: 'Quiz', porcentaje: '30'}]; }

  ngOnInit(): void {
    this.setRubrosGrupo();
  }

  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }

  editar(): void{
    console.log('editado');
  }

  asignacionesDialog(rubro): void {
    const param = {rubro};
    const dialogRef = this.dialog.open(AsignacionesComponent, {
      width: '85%',
      height: '70%',
      data: param,
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      }
    });
    dialogRef.afterClosed().subscribe(res => {console.log(res); });
  }

  setRubrosGrupo(): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/verRubrosGrupo', {
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

  editarRubro(rubro): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/editarRubrosGrupo', {
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: +this.messenger.curso.grupo,
      rubro,
      nuevoRubro: rubro,
      nuevoPorcentaje: Number((document.getElementById(rubro + 'porc') as HTMLInputElement).value)
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        // tslint:disable-next-line:triple-equals
        if (resp[0].error != 'null'){
          alert(resp[0].error);
        }else{
          this.ngOnInit();
        }
      }
    );
  }
  crearRubro(): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/crearRubro', {
      rubro: (document.getElementById('nombre') as HTMLInputElement).value,
      porcentaje: Number((document.getElementById('porcentaje') as HTMLInputElement).value),
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: +this.messenger.curso.grupo,
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        // tslint:disable-next-line:triple-equals
        if (resp[0].error != 'null'){
          alert(resp[0].error);
        }else{
          this.ngOnInit();
        }
      }
    );
  }

  eliminarRubro(rubro): void{
    this.httpService.post(this.messenger.urlServer + 'Grupo/eliminarRubro', {
      rubro,
      codigoCurso: this.messenger.curso.codigo,
      numeroGrupo: +this.messenger.curso.grupo,
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        // tslint:disable-next-line:triple-equals
        if (resp[0].error != 'null'){
          alert(resp[0].error);
        }else{
          this.ngOnInit();
        }
      }
    );
  }
}

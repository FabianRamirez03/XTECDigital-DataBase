import { Component, OnInit } from '@angular/core';
import {AddEstudianteComponent} from '../../admin/add-estudiante/add-estudiante.component';
import {MatDialog} from '@angular/material/dialog';
import {AsignacionesComponent} from '../asignaciones/asignaciones.component';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.scss']
})
export class RubrosComponent implements OnInit {
  rubros: any;
  constructor(public dialog: MatDialog) {
    this.rubros = [{nombre: 'Examen', porcentaje: '70'}, {nombre: 'Quiz', porcentaje: '30'}]; }

  ngOnInit(): void {
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

  asignacionesDialog(): void {
    const param = [null];
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

}

import { Component, OnInit } from '@angular/core';
import {AddProfesorComponent} from '../../admin/add-profesor/add-profesor.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.scss']
})
export class AsignacionesComponent implements OnInit {
  asignaciones: any;
  constructor() {
    this.asignaciones = [
      {nombre: 'Quiz1', fecha: '21/5/202', hora: '21:00',
        peso: '12', especificacion: 'file', personas: '2'
      }, {nombre: 'Quiz2', fecha: '26/5/202', hora: '00:00',
        peso: '20', especificacion: 'file', personas: '3'
      }];
  }

  ngOnInit(): void {
  }

  agregar(): void{
    console.log('agregado');
  }
  eliminar(): void{
    console.log('eliminado');
  }
}

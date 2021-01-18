import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {MessengerService} from "../../MessengerService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-noticia',
  templateUrl: './add-noticia.component.html',
  styleUrls: ['./add-noticia.component.scss']
})
export class AddNoticiaComponent implements OnInit {
  noticias: any;
  cursos: any;
  codigoCurso: any;
  numeroGrupo: any;
  tituloNoticia: any;
  mensaje: any;
  respuesta: any;
  misGrupos: any;
  comunicado: any;


  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router ) {
    this.noticias = [{profesor: 'Milton Villegas',
      comunicado: 'bla bla bla',
      fecha: '12/3/2020',
      grupo: '1',
      titulo: 'Proyecto',
      curso: 'Intro'},
      {profesor: 'Milton Villegas',
        comunicado: 'bla bla bla',
        fecha: '12/3/2020',
        grupo: '1',
        titulo: 'Proyecto de entrega ',
        curso: 'Intro'}];
    this.cursos = [{nombre: 'bases'}, {nombre: 'senales'}, {nombre: 'anpi'}];
  }

  ngOnInit(): void {
    this.setMisGrupos();
  }

  eliminar(): void{
    console.log('eliminado');
  }

  agregar(): void {
    const codigoYGrupo = (document.getElementById('grupo') as HTMLInputElement).value.split('|', 2);
    this.codigoCurso = codigoYGrupo[0];
    this.numeroGrupo = +codigoYGrupo[1];
    this.tituloNoticia = (document.getElementById('titulo') as HTMLInputElement).value;
    this.mensaje = this.comunicado;
    console.log({
      codigoCurso: this.codigoCurso,
      numeroGrupo: this.numeroGrupo,
      tituloNoticia: this.tituloNoticia,
      mensaje: this.mensaje,
    });
    this.httpService.post(this.messenger.urlServer + 'Noticias/crearNoticiaGrupo',
      {
        codigoCurso: this.codigoCurso,
        numeroGrupo: this.numeroGrupo,
        tituloNoticia: this.tituloNoticia,
        mensaje: this.mensaje,
      }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.respuesta = resp;
        // tslint:disable-next-line:triple-equals
        if (resp[0].respuesta != 'error'){
          this.ngOnInit();
        }else{
          alert(resp[0].error);
        }
      }
    );
  }
  setMisGrupos(): void{
    this.httpService.post(this.messenger.urlServer + 'Usuario/verCursosProfesor', {
      cedula: this.messenger.usuario.carnet
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.misGrupos = resp;
      }
    );
  }
}

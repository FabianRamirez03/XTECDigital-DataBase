import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessengerService} from '../../MessengerService';
import {Router} from '@angular/router';

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
  misNoticias: any;


  constructor( public httpService: HttpClient, public messenger: MessengerService, private router: Router ) {
  }

  ngOnInit(): void {
    this.setMisGrupos();
    this.setMisNoticias();
  }

  eliminar(codigoCurso, numeroGrupo, tituloNoticia): void{
    this.httpService.post(this.messenger.urlServer + 'Noticias/eliminarNoticia',
      {
        codigoCurso,
        numeroGrupo,
        tituloNoticia,
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

  agregar(): void {
    const codigoYGrupo = (document.getElementById('grupo') as HTMLInputElement).value.split('|', 2);
    this.codigoCurso = codigoYGrupo[0];
    this.numeroGrupo = +codigoYGrupo[1];
    this.tituloNoticia = (document.getElementById('titulo') as HTMLInputElement).value;
    this.mensaje = this.comunicado;
    this.httpService.post(this.messenger.urlServer + 'Noticias/crearNoticiaGrupo',
      {
        codigoCurso: this.codigoCurso,
        numeroGrupo: this.numeroGrupo,
        tituloNoticia: this.tituloNoticia,
        mensaje: this.mensaje,
        cedulaAutor: this.messenger.usuario.carnet
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

  setMisNoticias(): void{
    this.httpService.post(this.messenger.urlServer + 'Noticias/verNoticiasProfesor', {
      cedulaAutor: this.messenger.usuario.carnet
    }).subscribe(
      (resp: HttpResponse<any>) =>
      {
        this.misNoticias = resp;
        console.log(resp);
      }
    );
  }


  modificarNoticia(codigoCurso, numeroGrupo, tituloViejo): void{
    this.httpService.post(this.messenger.urlServer + 'Noticias/editarNoticiaGrupo',
      {
        codigoCurso,
        numeroGrupo,
        tituloViejo,
        tituloNoticia: (document.getElementById(tituloViejo + 'title') as HTMLInputElement).value,
        mensaje: (document.getElementById(tituloViejo + 'msj') as HTMLInputElement).value
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
}


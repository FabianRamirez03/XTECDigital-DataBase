import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Obj} from '@popperjs/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  password: any;
  existe: any;
  constructor(public httpService: HttpClient, private router: Router) { }
  login(): void{
    this.user = (document.getElementById('user') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;
    this.httpService.post('https://localhost:5001/Usuario/validarUser',
      { carnet: this.user, password: this.password}).subscribe(
      (resp: HttpResponse<object>) =>
      {
        this.existe = resp;
        // @ts-ignore
        // tslint:disable-next-line:triple-equals
        if (resp[0][0].error == 'null'){
          // Hay que guardar la info del estudiante qué está
          this.router.navigate(['/', 'ListaCursos']);
        }
        else{
          alert(resp[0][0].error);
        }
      });
  }
  ngOnInit(): void {
  }

}

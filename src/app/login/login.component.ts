import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessengerService} from '../MessengerService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  password: any;
  existe: any;
  constructor(public httpService: HttpClient, private router: Router, public messenger: MessengerService) { }
  login(): void{
    this.user = (document.getElementById('user') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;
    this.httpService.post('https://localhost:5001/Usuario/validarUser',
      { carnet: this.user, password: this.password}).subscribe(
      (resp: HttpResponse<object>) =>
      {
        this.existe = resp;
        if (resp[0][0].error === 'null'){
          if (resp[0][0].rol === 'estudiante'){
            this.messenger.usuario = resp[1][0];
            console.log(this.messenger.usuario);
            alert('Es estudiante');
          }
          else if (resp[0][0].rol === 'profesor'){
            this.messenger.usuario = resp[1][0];
            console.log(this.messenger.usuario);
            alert('Es profe');
          }
          else {
            this.messenger.usuario = resp[1][0];
            console.log(this.messenger.usuario);
            this.router.navigate(['/', 'ListaCursos']);
          }
        }
        else{
          alert(resp[0][0].error);
        }
      });
  }
  ngOnInit(): void {
  }

}

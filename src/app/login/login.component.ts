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
    const userAsInteger: number = +this.user;
    this.password = (document.getElementById('password') as HTMLInputElement).value;
    this.httpService.post('https://localhost:5001/Usuario/validarUser',
      { carnet: userAsInteger, password: this.password}).subscribe(
      (resp: HttpResponse<object>) => { this.existe = resp;

                                        // @ts-ignore
                                        if (resp.carnet != null){
          console.log(resp);
          this.router.navigate(['/', 'ListaCursos']);
        }
        else{
          console.log('notwins');
        }});
  }
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  password: any;
  constructor() { }
  login(): void{
    this.user = (document.getElementById('user') as HTMLInputElement).value;
    this.password = (document.getElementById('password') as HTMLInputElement).value;
  }
  ngOnInit(): void {
  }

}

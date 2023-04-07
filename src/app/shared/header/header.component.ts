import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombre: string = "";
  usuario: string = "";

  constructor( private loginService:LoginService) { }

  ngOnInit(): void {
    this.lecturaJWT();
    this.usuario = sessionStorage.getItem('usuario') || '';
  }

  logout(){
    this.loginService.logout();
  }

  lecturaJWT(){
    const decode:any = jwt_decode(sessionStorage.getItem('token') || '');
    console.log(decode);
    
    this.nombre = decode.name;

  }

}

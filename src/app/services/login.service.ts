import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login.interfces';
import { Menu } from '../interfaces/menu.interfaces';

let url: string = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token = sessionStorage.getItem('token') || ''

  get header(){
    return {
      headers:{
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    }
  }

  constructor( private http: HttpClient,
                private router: Router ) { }


  login( Usuario: string, Contrasenia: string, ):Observable<Login>{
    const body = { Usuario, Contrasenia };
    return this.http.post<Login>(`${url}/MS_SeguridadesCommand/api/Login/Login`, body, {
      headers:{
            'Content-Type': 'application/json'
          }
    });
    
  }

  recuperarMenu(login: Login):Observable<Menu>{
    sessionStorage.setItem('token', login.data.token);
    sessionStorage.setItem('usuario', login.data.usuario);
    sessionStorage.setItem('idRol', String(login.data.idRol));
    const usuario = sessionStorage.getItem('usuario') || '';
    const idRol = sessionStorage.getItem('idRol') || '';    
    const body = {usuario, idRol};
    return this.http.post<Menu>(`${url}/MS_SeguridadesCommand/api/Login/ObtenerMenu`,body, this.header)
  }


  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('idRol');
    sessionStorage.removeItem('menu');
    this.router.navigateByUrl('/login')
  }
}

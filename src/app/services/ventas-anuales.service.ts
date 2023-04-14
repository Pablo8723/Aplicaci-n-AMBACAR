import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jwt2 } from '../interfaces/jwt2.interfaces';
import { PorAgencia, VentasAnuales } from '../interfaces/ventasAnuales.interfaces';

import { Usuario } from '../interfaces/usuario.class';


let url: string = environment.url;
@Injectable({
  providedIn: 'root'
})
export class VentasAnualesService {


  token = sessionStorage.getItem('token') || ''

  get header(){
    return {
      headers:{
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    }
  }

  constructor( private http: HttpClient ) { }


  obtenerJWT2(){
    const user = "LOGISTICA";
    const password = "string";
    const ipAddress = "string";
    const rol = "ADMINISTRADOR";
    const nombreServicio = "MS_ReportesQuery"
    const body= {user, password,ipAddress,rol,nombreServicio}
    return this.http.post<Jwt2>('https://logisticaapi.ambacar.ec/MS_SeguridadesCommand/api/Token/Authenticate', body, this.header)
  }

  obtenerVentas( jwt: string ): Observable<VentasAnuales>{
    return this.http.get<VentasAnuales>('https://logisticaapi.ambacar.ec/MS_ReportesQuery/api/Gerenciales/Ventas?Mes=03&Anio=2023', {
      headers:{
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }



  modificarPorAgencia( agencia: PorAgencia):Observable<PorAgencia>{
    return this.http.put<PorAgencia>(`${url}/actualizar`, agencia, this.header);
  }

  cargarUsuario( id: string ):Observable<Usuario>{
    return this.http.get<Usuario>(`${url}/algo/${id}`, this.header);
  }


  getUsuarios( ){
    return this.http.get<{total: number, usuarios:Usuario[]}>(`${url}/algo`, this.header)
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.apellido, user.email, user.direccion, user.identificacion, user.fechaIngreso));
          return{
            total: resp.total,
            usuarios
          }
        })
      )
  }

}

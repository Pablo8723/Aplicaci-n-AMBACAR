import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jwt2 } from '../interfaces/jwt2.interfaces';
import { VentasAnuales } from '../interfaces/ventasAnuales.interfaces';


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


}

import { Injectable } from '@angular/core';
import { MenuHijo } from '../interfaces/menuHijo.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  menu:MenuHijo[] = [];

  cargarMenu(){
    return this.menu = JSON.parse(sessionStorage.getItem('menu')!) || [];
  }
  // menu: any[] =[
  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu:[
  //       { titulo: 'DashBoard', url: 'dashboard'},
  //       { titulo: 'Graficas', url: 'graficas'},
  //       { titulo: 'ProgressBar', url: 'progresbar'},
  //       { titulo: 'Promesas', url: 'promesas'},
  //       { titulo: 'Rxjs', url: 'rxjs'},
  //     ]
  //   }
  // ];

}



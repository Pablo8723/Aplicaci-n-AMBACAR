import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiderbarService {

  menu: any[] =[
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'DashBoard', url: 'dashboard'},
        { titulo: 'Graficas', url: 'graficas'},
        { titulo: 'ProgressBar', url: 'progresbar'},
        { titulo: 'Promesas', url: 'promesas'},
        { titulo: 'Rxjs', url: 'rxjs'},
      ]
    }
  ];

  constructor() { }
}



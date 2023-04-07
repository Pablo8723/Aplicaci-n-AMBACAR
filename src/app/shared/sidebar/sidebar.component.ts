import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';
import { SiderbarService } from 'src/app/services/siderbar.service';

import { MenuHijo } from 'src/app/interfaces/menuHijo.interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: MenuHijo[] = [];
  nombreUsuario: string = "";

  constructor( private siderbarServices: SiderbarService,
                private loginService: LoginService ) { 
    this.menuItems = siderbarServices.cargarMenu();
  }
  
  ngOnInit(): void {
    this.nombreUsuario = sessionStorage.getItem('usuario') || '';
  }

  logout(){
    this.loginService.logout();
  }

}

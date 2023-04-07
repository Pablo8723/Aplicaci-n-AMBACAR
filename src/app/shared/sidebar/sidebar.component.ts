import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu.interfaces';
import { MenuHijo } from 'src/app/interfaces/menuHijo.interfaces';
import { LoginService } from 'src/app/services/login.service';
import { SiderbarService } from 'src/app/services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems!:MenuHijo[];

  constructor( private loginService: LoginService,
                private router: Router ) { 
    //this.menuItems = siderbarServices.menu;
  }
  
  ngOnInit(): void {
    this.construyeMenu();
  }

  construyeMenu(){
    
    this.loginService.recuperarMenu()
            .subscribe( resp => {
              this.menuItems = resp.data;
              console.log(this.menuItems );
            }, (err) => {
              this.router.navigateByUrl('/login');              
            })
  }

  logout(){
    this.loginService.logout();
  }

}

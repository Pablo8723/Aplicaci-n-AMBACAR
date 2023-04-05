import { Component, OnInit } from '@angular/core';
import { SiderbarService } from 'src/app/services/siderbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems!: any[];

  constructor( private siderbarServices: SiderbarService ) { 
    this.menuItems = siderbarServices.menu;
  }
  
  ngOnInit(): void {
  }

}

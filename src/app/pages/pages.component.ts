import { Component, OnInit } from '@angular/core';
import { SetingsService } from '../services/setings.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


declare function customInit():any;


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  public custom: string = "";

  constructor( private settingService: SetingsService ) { }

  ngOnInit(): void {
    customInit();
  }
  

}

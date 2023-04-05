import { Component, OnInit } from '@angular/core';
import { SetingsService } from '../services/setings.service';


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

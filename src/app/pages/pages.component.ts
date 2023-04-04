import { Component, OnInit } from '@angular/core';
import { SetingsService } from '../services/setings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

 

  constructor( private settingService: SetingsService ) { }

  ngOnInit(): void {
  }

}

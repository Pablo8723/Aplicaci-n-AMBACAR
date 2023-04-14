import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetingsService {

  private linkTheme = document.querySelector('#theme');


  constructor() { 
    //Aqui se carga el tema de la aplicación ./assets/css/colors/red.css

    const theme = localStorage.getItem('tema') || './assets/css/colors/blue.css';
    this.linkTheme?.setAttribute('href', theme);
  }

  changeTheme(tema: string){

    const url = `./assets/css/colors/${tema}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('tema', url);
    this.check();
  }

  check(){

    const links= document.querySelectorAll('.selector');
    
    links.forEach( elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const checkTheme = this.linkTheme?.getAttribute('href');

      if( btnThemeUrl === checkTheme ){
        elem.classList.add('working');
      }
    })
  }

  
}

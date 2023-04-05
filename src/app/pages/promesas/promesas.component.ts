import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const promesa = new Promise( (resolve, reject) => {

      if(true){
        resolve('hola promesa');
      }else{
        reject('error en promesa');
      }

    });

    promesa.then( ( resp  ) => {
      console.log(resp);
    })
    .catch( error => console.log('mensaje del reject: ', error))

    
    console.log('estoy fuera de la promesa');

  }

}

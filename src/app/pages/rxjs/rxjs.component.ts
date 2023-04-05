import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent {

  constructor() { 

    let i=-1;

    const obs$ = new Observable( observer => {
      const intervalo =  setInterval( () => {
        i++;
        observer.next(i);

        if( i === 5){
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2 ){
          observer.error('i llego a 2')
        }
      }, 1000)
    })

    obs$.subscribe(
      valor => console.log('Subs: ',  valor),
      (err) => console.log('Error:', err),
      () => console.log('Info obs Terminado')
    );


  }


}

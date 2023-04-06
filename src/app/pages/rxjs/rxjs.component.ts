import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map,filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  intervaloSubs!: Subscription;

  constructor() { 

    // this.retornaIntervalo().pipe(
    //   retry(2)
    // )
    // .subscribe(
    //   valor => console.log('Subs: ',  valor),
    //   (err) => console.log('Error:', err),
    //   () => console.log('Info obs Terminado')
    // );

    this.intervaloSubs = this.retornaInterval()      
      .subscribe( console.log )

  }
  
  ngOnDestroy(): void {
    this.intervaloSubs.unsubscribe();
  }

  retornaInterval(): Observable<number>{
    return interval(300)
            .pipe(
              map( valor => valor + 1), //0 es par, 1 es impar
              filter( valor => ( valor % 2 === 0)? true : false),
              //take(10),
            );
  }


  retornaIntervalo(): Observable<number>{
    let i=-1;
    return new Observable<number>( observer => {
      const intervalo =  setInterval( () => {
        i++;
        observer.next(i);

        if( i === 5){
          clearInterval( intervalo );
          observer.complete();
        }
        if( i === 2 ){
          console.log('error');
          observer.error('i llego a 2')
        }
      }, 500)
    })    
  }


}

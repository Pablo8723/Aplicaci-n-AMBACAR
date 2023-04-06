import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-bedcrums',
  templateUrl: './bedcrums.component.html',
  styleUrls: ['./bedcrums.component.css']
})
export class BedcrumsComponent  {

  titulo: string = '';
  modulo: string = '';
  constructor( private router: Router ) { 


    this.router.events
      .pipe(
        filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data )
      )
      .subscribe( ({titulo, modulo}) => {
      this.titulo = titulo;
      this.modulo = modulo;
    })
  }



}

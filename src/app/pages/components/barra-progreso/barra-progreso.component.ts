import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-progreso',
  templateUrl: './barra-progreso.component.html',
  styleUrls: ['./barra-progreso.component.css']
})
export class BarraProgresoComponent {

@Input() progreso: number = 10;

  get getPorcentaje(){
    return `${this.progreso}%`
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-barra-progreso',
  templateUrl: './barra-progreso.component.html',
  styleUrls: ['./barra-progreso.component.css']
})
export class BarraProgresoComponent {

@Input() progreso: number = 10;
@Input() colorBarra: string = 'btn-info'

  get getPorcentaje(){
    return `${this.progreso}%`
  }

  get claseColor(){
    return `progress-bar ${this.colorBarra} progress-bar-striped active`
  }

}

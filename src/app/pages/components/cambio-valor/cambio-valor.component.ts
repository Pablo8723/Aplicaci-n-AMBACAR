import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambio-valor',
  templateUrl: './cambio-valor.component.html',
  styleUrls: ['./cambio-valor.component.css']
})
export class CambioValorComponent implements OnInit{

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() progreso: number=0;
  @Input() btnClass: string = 'btn-info';

  @Output() onValor: EventEmitter<number> = new EventEmitter();


  cambiarValor( valor: number ){
    
    if(this.progreso >= 100 && this.progreso >= 0){
      this.onValor.emit(100);
      return this.progreso = 100;
    }

    if(this.progreso <= 0 && this.progreso <= 0){
      this.onValor.emit(0);
      return this.progreso = 0;
    }


    this.progreso += valor;
    return this.onValor.emit(this.progreso);

  }

  onChange(valor: number){

    if(valor >= 100){
      valor=100;
    }else if(valor <= 0){
      valor = 0;
    }

    this.onValor.emit(valor)
  }
}

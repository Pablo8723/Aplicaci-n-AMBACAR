import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { PorM } from 'src/app/interfaces/ventasAnuales.interfaces';
import { VentasAnualesService } from 'src/app/services/ventas-anuales.service';

import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta-anual',
  templateUrl: './venta-anual.component.html',
  styles: [
  ]
})
export class VentaAnualComponent implements OnInit {


/* *************************************** INPUTS & OUTPUTS ***************************************** */
/* *************************************** ---------------- ***************************************** */

/* *********************************** VARIABLES GLOBALES ******************************************* */
/* *********************************** ------------------ ******************************************* */

  porModelo: PorM[] = []
  cargando: boolean = false;

/* *********************************** COSTRUCTOR Y CICLO DE VIDA *********************************** */
/* *********************************** -------------------------- *********************************** */

  constructor( private ventasServices: VentasAnualesService ) { }

  ngOnInit(): void {
    this.cargaInfo();
  }

/* *********************************** FORMULARIOS DEL FORMULARIO *********************************** */
/* *********************************** -------------------------- *********************************** */

/* *********************************** FUNCIONES VARIAS ********************************************* */
/* *********************************** ---------------- ********************************************* */

  cargaInfo(){
    this.cargando = true;
    this.ventasServices.obtenerJWT2()
      .pipe(
        switchMap( jwt => this.ventasServices.obtenerVentas(jwt.data.jwToken))
      )
      .subscribe( ventas => {
        this.porModelo = ventas.data.porModelo;
        console.log(this.porModelo);
        this.cargando = false;
      }, (err) => {
        Swal.fire({
          icon:'error',
          title:'Trabajo suspendido...',
          text: err.errors
        })
        this.cargando = false;
      })
  }

  exportToExcel(): void {
    let name = `Ventas Anuales.xlsx`;
    let element = document.getElementById('ventasAnuales');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, `Clientes`);

    XLSX.writeFile(book, name);

    Swal.fire({
      icon: 'success',
      title: 'Trabajo Realizado!!!',
      text: `El archivo ${name}.xlsx se descargo, revise su carpeta de desacargas si el mismo aun no se abre.`
    })
  }
  
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

import { VentasAnualesService } from 'src/app/services/ventas-anuales.service';
import { PorAgencia } from 'src/app/interfaces/ventasAnuales.interfaces';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-por-agencia',
  templateUrl: './por-agencia.component.html',
  styles: [
  ],
})

export class PorAgenciaComponent implements OnInit, AfterViewInit {


/* *************************************** INPUTS & OUTPUTS ***************************************** */
/* *************************************** ---------------- ***************************************** */

/* *********************************** VARIABLES GLOBALES ******************************************* */
/* *********************************** ------------------ ******************************************* */
  displayedColumns: string[] = ['agencia', 'ambacar', 'ciauto', 'codAgencia', 'comentario', 'cumplimiento', 'exonerados', 'mes2', 'posicion', 'presupuesto', 'zona', 'zonaAux', 'acciones'];
  dataSource!: MatTableDataSource<PorAgencia>;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  cargando: boolean = false;
/* *********************************** COSTRUCTOR Y CICLO DE VIDA *********************************** */
/* *********************************** -------------------------- *********************************** */


  constructor( private ventasServices: VentasAnualesService,
                private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.cargaInfo();
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
/* *********************************** FORMULARIOS DEL FORMULARIO *********************************** */
/* *********************************** -------------------------- *********************************** */

  agenciasForm = this.fb.group({
    agencia   : [, [Validators.required]],
    ambacar   : ['', [Validators.required]],
    exonerados: ['', [Validators.required]],
    mes2      : ['', [Validators.required]],
  })


/* *********************************** FUNCIONES VARIAS ********************************************* */
/* *********************************** ---------------- ********************************************* */

  cargaInfo(){
    this.cargando = true;
    this.ventasServices.obtenerJWT2()
      .pipe(
        switchMap( jwt => this.ventasServices.obtenerVentas(jwt.data.jwToken))
      )
      .subscribe( ventas => {
        this.dataSource = new MatTableDataSource(ventas.data.porAgencia);
        console.log(ventas.data.porAgencia);
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

  guardar( agencia: PorAgencia){
    console.log(agencia);
  }

  validar( agencia:PorAgencia ){
    let suma:number = Number(agencia.ambacar) + Number(agencia.exonerados);
    agencia.mes2 = suma;
  }
}


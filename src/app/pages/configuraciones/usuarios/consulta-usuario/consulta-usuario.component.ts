import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-usuario',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css']
})
export class ConsultaUsuarioComponent implements OnInit {

/* *************************************** INPUTS & OUTPUTS ***************************************** */
/* *************************************** ---------------- ***************************************** */

/* *********************************** VARIABLES GLOBALES ******************************************* */
/* *********************************** ------------------ ******************************************* */

  cargando: boolean = false;


/* *********************************** COSTRUCTOR Y CICLO DE VIDA *********************************** */
/* *********************************** -------------------------- *********************************** */

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.cargando = true;

    this.cargando= false;
  }

/* *********************************** FORMULARIOS DEL FORMULARIO *********************************** */
/* *********************************** -------------------------- *********************************** */

/* *********************************** FUNCIONES VARIAS ********************************************* */
/* *********************************** ---------------- ********************************************* */

  editar(id: string){
    console.log(id);
    this.router.navigateByUrl(`ambacar/editarUsuario/${id}`)
  } 

  nuevo(){
    this.router.navigateByUrl('ambacar/nuevoUsuario')
  }

}

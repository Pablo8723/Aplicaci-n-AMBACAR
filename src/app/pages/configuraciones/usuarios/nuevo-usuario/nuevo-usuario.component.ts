import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {


/* *************************************** INPUTS & OUTPUTS ***************************************** */
/* *************************************** ---------------- ***************************************** */

/* *********************************** VARIABLES GLOBALES ******************************************* */
/* *********************************** ------------------ ******************************************* */

  cargando: boolean = false;

/* *********************************** COSTRUCTOR Y CICLO DE VIDA *********************************** */
/* *********************************** -------------------------- *********************************** */

  constructor( private fb:FormBuilder ) { }

  ngOnInit(): void {
  }

/* *********************************** FORMULARIOS DEL FORMULARIO *********************************** */
/* *********************************** -------------------------- *********************************** */

  usuarioForm = this.fb.group({
    nombre          : ['', [Validators.required, Validators.minLength(3)]],
    apellido        : ['', [Validators.required, Validators.minLength(3)]],
    email           : ['', [Validators.required, Validators.email]],
    celular         : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    direccion       : ['', [Validators.required, Validators.minLength(5)]],
    identificacion  : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    fechaIngreso    : ['', [Validators.required]]   

  })



/* *********************************** FUNCIONES VARIAS ********************************************* */
/* *********************************** ---------------- ********************************************* */
  

}

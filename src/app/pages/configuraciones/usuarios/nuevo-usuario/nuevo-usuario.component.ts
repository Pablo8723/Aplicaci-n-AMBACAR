import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

import { ErrorStateMatcher } from '@angular/material/core';

import Swal from 'sweetalert2';
import { CambioPrecioRepuesto } from '../../../../interfaces/oscar.interfaces';
import { Usuario } from 'src/app/interfaces/usuario.class';
import { VentasAnualesService } from 'src/app/services/ventas-anuales.service';

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
  fechaMaxima: Date = new Date();
  matcher = new ErrorStateMatcher();
  cambioPrecioRepuesto!: CambioPrecioRepuesto;
  id: string = '';
  total: number = 0;
  usuarios:Usuario[]=[];

/* *********************************** COSTRUCTOR Y CICLO DE VIDA *********************************** */
/* *********************************** -------------------------- *********************************** */

  constructor( private fb:FormBuilder,
                private ventaServices:VentasAnualesService,
                private dateAdaptar: DateAdapter<Date>) {
    
    this.dateAdaptar.setLocale('en-GB')//dd/mm/yyyy
  }

  ngOnInit(): void {
    this.cargaUsuario(this.id);
  }

/* *********************************** FORMULARIOS DEL FORMULARIO *********************************** */
/* *********************************** -------------------------- *********************************** */

  usuarioForm = this.fb.group({
    nombre          : [ '', [Validators.required, Validators.minLength(3)]],
    apellido        : [ '', [Validators.required, Validators.minLength(3)]],
    email           : [ '', [Validators.required, Validators.email]],
    celular         : [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    direccion       : [ '', [Validators.required, Validators.minLength(5)]],
    identificacion  : [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    fechaIngreso    : [ '', [Validators.required]]   

  })



/* *********************************** FUNCIONES VARIAS ********************************************* */
/* *********************************** ---------------- ********************************************* */
  
  cargaUsuario(id: string){
    if(id){
      this.ventaServices.getUsuarios()
        .subscribe( ({total, usuarios}) => {
          this.usuarios = usuarios;
          this.total = total
        })      
    }
  }

  guardar(){
    if(this.usuarioForm.valid){
      console.log(this.usuarioForm.value);
    }else{
      Swal.fire({
        icon:'error',
        title: 'Tarea Suspendida',
        text:'Faltan campos por completar!!!'
      });
    }
  }


}

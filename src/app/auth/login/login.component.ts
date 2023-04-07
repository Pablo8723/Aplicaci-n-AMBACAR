import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Login } from 'src/app/interfaces/login.interfces';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

/* *************************************** INPUTS & OUTPUTS ***************************************** */
/* *************************************** ---------------- ***************************************** */

/* *********************************** VARIABLES GLOBALES ******************************************* */
/* *********************************** ------------------ ******************************************* */

  public cargando: boolean = false;
  public acceso!:Login;


/* *********************************** COSTRUCTOR Y CICLO DE VIDA *********************************** */
/* *********************************** -------------------------- *********************************** */
  constructor( private router: Router,
                private loginService:LoginService,
                private fb: FormBuilder) { }

  ngOnInit(): void {
  }


/* *********************************** FORMULARIOS DEL FORMULARIO *********************************** */
/* *********************************** -------------------------- *********************************** */


  public loginForm = this.fb.group({
    usuario: [ localStorage.getItem('usuario') || '', [ Validators.required] ],
    password: [ '', [ Validators.required ] ],
    recuerdame: [ localStorage.getItem('recuerdame') || false ]
  })

/* *********************************** FUNCIONES VARIAS ********************************************* */
/* *********************************** ---------------- ********************************************* */

  login(){
    this.cargando = true;
    if(this.loginForm.valid){
      const user = this.loginForm.get('usuario')?.value || "";
      const pass = this.loginForm.get('password')?.value || "";
      this.loginService.login(user, pass)
        .subscribe( (resp) => {
          this.acceso = resp;
          this.cargando = false;
          console.log(resp);
          sessionStorage.setItem('token', this.acceso.data.token);
          sessionStorage.setItem('usuario', this.acceso.data.usuario);
          sessionStorage.setItem('idRol', String(this.acceso.data.idRol));
          if(this.loginForm.get('recuerdame')?.value){
            localStorage.setItem('recuerdame','true');
            localStorage.setItem('usuario', user);
          }else{
            localStorage.removeItem('usuario');
            localStorage.removeItem('recuerdame');
          }          
          this.router.navigateByUrl('ambacar/dashboard');          

        }, (err) => {
          console.log(err);
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.Message,
            showConfirmButton: false,
            timer: 5000
          })
          this.cargando = false;
        });
        
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se debe completar Usuario y Password!!!',
        showConfirmButton: false,
        timer: 5000
      })
      this.cargando = false;
    }
  }

}

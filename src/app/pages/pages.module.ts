import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesnotfoundComponent } from './pagesnotfound/pagesnotfound.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BarraProgresoComponent } from './components/barra-progreso/barra-progreso.component';
import { CambioValorComponent } from './components/cambio-valor/cambio-valor.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MaterialModule } from '../material/material/material.module';
import { NuevoUsuarioComponent } from './configuraciones/usuarios/nuevo-usuario/nuevo-usuario.component';
import { ConsultaUsuarioComponent } from './configuraciones/usuarios/consulta-usuario/consulta-usuario.component';
import { NuevaNinieraComponent } from './configuraciones/niniera/nueva-niniera/nueva-niniera.component';
import { ConsultaNinieraComponent } from './configuraciones/niniera/consulta-niniera/consulta-niniera.component';
import { CargandoComponent } from './components/cargando/cargando.component';



@NgModule({
  declarations: [
    GraficasComponent,
    PagesnotfoundComponent,
    DashboardComponent,
    ProgressBarComponent,
    BarraProgresoComponent,
    CambioValorComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    NuevoUsuarioComponent,
    ConsultaUsuarioComponent,
    NuevaNinieraComponent,
    ConsultaNinieraComponent,
    CargandoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

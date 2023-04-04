import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesnotfoundComponent } from './pagesnotfound/pagesnotfound.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { FormsModule } from '@angular/forms';
import { BarraProgresoComponent } from './components/barra-progreso/barra-progreso.component';
import { CambioValorComponent } from './components/cambio-valor/cambio-valor.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';



@NgModule({
  declarations: [
    GraficasComponent,
    PagesnotfoundComponent,
    DashboardComponent,
    ProgressBarComponent,
    BarraProgresoComponent,
    CambioValorComponent,
    AccountSettingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }

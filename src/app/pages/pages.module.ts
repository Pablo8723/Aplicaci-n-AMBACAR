import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesnotfoundComponent } from './pagesnotfound/pagesnotfound.component';
import { GraficasComponent } from './graficas/graficas.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';



@NgModule({
  declarations: [
    GraficasComponent,
    PagesnotfoundComponent,
    DashboardComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }

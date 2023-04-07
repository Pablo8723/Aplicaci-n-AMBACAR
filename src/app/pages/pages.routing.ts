import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { AuthGuard } from "../guards/auth.guard";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraficasComponent } from "./graficas/graficas.component";
import { PagesComponent } from "./pages.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";

const routes: Routes =[
    { 
        path:'ambacar', 
        component:PagesComponent,
        canActivate: [ AuthGuard ],
        children:[
            { path:'account', component: AccountSettingComponent, data: { titulo: 'Configuración', modulo:'Usuario' } },

            { path:'dashboard', component: DashboardComponent, data: { titulo: 'DashBoard', modulo:'ambacar' } },
            { path:'Menu.aspx', component: GraficasComponent, data: { titulo: 'Graficas', modulo:'ambacar' } },
            { path:'progresbar', component: ProgressBarComponent, data: { titulo: 'Barra de Progreso', modulo:'ambacar' } },
            { path:'promesas', component: PromesasComponent, data: { titulo: 'Promesas', modulo:'ambacar' } },
            { path:'rxjs', component: RxjsComponent, data: { titulo: 'RxJs', modulo:'ambacar' } },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class PagesRoutingModule{}
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";


import { DashboardComponent } from "./dashboard/dashboard.component";
import { GraficasComponent } from "./graficas/graficas.component";
import { PagesComponent } from "./pages.component";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { AccountSettingComponent } from "./account-setting/account-setting.component";

const routes: Routes =[
    { 
        path:'ambacar', 
        component:PagesComponent,
        children:[
            { path:'account', component: AccountSettingComponent },
            { path:'dashboard', component: DashboardComponent },
            { path:'graficas', component: GraficasComponent },
            { path:'progresbar', component: ProgressBarComponent },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class PagesRoutingModule{}
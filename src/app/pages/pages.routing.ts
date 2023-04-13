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
import { ConsultaUsuarioComponent } from "./configuraciones/usuarios/consulta-usuario/consulta-usuario.component";
import { NuevoUsuarioComponent } from "./configuraciones/usuarios/nuevo-usuario/nuevo-usuario.component";
import { VentaAnualComponent } from "./configuraciones/venta-anual/venta-anual.component";
import { PorAgenciaComponent } from "./configuraciones/por-agencia/por-agencia.component";

const routes: Routes =[
    { 
        path:'ambacar', 
        component:PagesComponent,
        canActivate: [ AuthGuard ],
        children:[
            { path:'account', component: AccountSettingComponent, data: { titulo: 'Configuración', modulo:'Usuario' } },

            { path:'dashboard', component: DashboardComponent, data: { titulo: 'DashBoard', modulo:'ambacar' } },
            { path:'graficas', component: GraficasComponent, data: { titulo: 'Graficas', modulo:'ambacar' } },
            { path:'progresbar', component: ProgressBarComponent, data: { titulo: 'Barra de Progreso', modulo:'ambacar' } },
            { path:'promesas', component: PromesasComponent, data: { titulo: 'Promesas', modulo:'ambacar' } },
            { path:'rxjs', component: RxjsComponent, data: { titulo: 'RxJs', modulo:'ambacar' } },

            { path:'00Usuarios.aspx', component: ConsultaUsuarioComponent, data:{ titulo: 'Consulta Usuarios', modulo:'configuraciones'}},            
            { path:'editarUsuario/:id', component: NuevoUsuarioComponent, data:{ titulo: 'Actualizar Usuario', modulo:'configuraciones'}},
            { path:'nuevoUsuario', component: NuevoUsuarioComponent, data:{ titulo: 'Crear Usuario', modulo:'configuraciones'}},
            
            
            { path:'ResumenMovilizacionesTablero.aspx', component: VentaAnualComponent, data:{ titulo: 'Venta Anual', modulo:'reportes'}},
            { path:'PDIEstados.aspx', component: PorAgenciaComponent, data:{ titulo: 'Por Agencia', modulo:'reportes'}},
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class PagesRoutingModule{}
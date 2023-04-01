import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';


import { PagesnotfoundComponent } from './pages/pagesnotfound/pagesnotfound.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  { path:'', redirectTo:'ambacar/dashboard', pathMatch: 'full' },
  { path:'**', component: PagesnotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PagesRoutingModule,
            AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

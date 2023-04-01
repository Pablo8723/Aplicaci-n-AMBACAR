import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


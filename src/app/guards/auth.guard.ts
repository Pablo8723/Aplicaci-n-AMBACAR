import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private router: Router,
                ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      if(sessionStorage.getItem('token')){
        const decode = jwt_decode(sessionStorage.getItem('token') || '');
        console.log(decode);
        return true;        
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }
  
}
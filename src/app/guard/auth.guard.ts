import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated = false;
  constructor(private router: Router) {}

  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isAuthenticated) {
        return true; //Usuario autenticado, permitir acceso
      } else {
        return this.router.navigate(['/login'])
      }
  }


}

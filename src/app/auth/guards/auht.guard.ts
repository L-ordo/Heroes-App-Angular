
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})

export class AuthGaurd implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean>{
      return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticaed => console.log('Autenticated:', isAuthenticaed) ),
        tap( isAuthenticaed => {
          // Si no esta autenticado
          if( !isAuthenticaed ){
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>  {
    return this.checkAuthStatus();
    // console.log('Can match');
    // console.log({route, segments});
    // return true;
    // throw new Error('Method not implemented.');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean>{
    return this.checkAuthStatus();
    // console.log('Can activate');
    // console.log({route, state});
    // return true;
    // throw new Error('Method not implemented.');
  }


}

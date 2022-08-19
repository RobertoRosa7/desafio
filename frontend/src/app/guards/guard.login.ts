import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from "../services/service.login";

@Injectable({
  providedIn: 'root',
})
export class LoginGuards implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackbar: MatSnackBar
  ) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginService.isAuthenticated().pipe(
      tap((auth) => {
        if (!auth) {
          this.router.navigateByUrl('/login').then();
          this.snackbar.open('Usuário não logado!', 'ok', {
            duration: 5000,
          });
        }
      })
    );
  }
}

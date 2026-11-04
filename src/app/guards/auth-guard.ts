import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (sessionStorage.getItem("TOKEN")) {
            return true;
        }
        return this._router.createUrlTree(['/login'], {
            queryParams: {returnUrl: state.url}
        });
    }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs/Rx";

@Injectable()
export class PrivilegeGuard implements CanActivate {
    constructor(private router: Router, private service: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;        
        return this.checkAuthorizations(url.split('/')[2]).map(res => res);
    }

    checkAuthorizations(url: string): Observable<boolean> {
        return new Observable(observe => {
            this.service.PRIVILEGE(url).subscribe(res => {
                var authorization = res["data"];
                localStorage.setItem('view_actual', JSON.stringify(authorization));
                observe.next(true);
            }, err => {
                observe.next(false);
            });
        });
    }
}
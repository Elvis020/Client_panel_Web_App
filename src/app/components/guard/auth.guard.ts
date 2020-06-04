import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private anguFireAuth: AngularFireAuth,
    private routy: Router,
    private afAuth: AngularFireAuth
  ) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      if (!auth) {
        this.routy.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    });
  }

}

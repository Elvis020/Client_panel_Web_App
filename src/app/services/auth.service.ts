import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private anguFireAuth: AngularFireAuth) { }


  // A method that authenticates the user in syzygy with Firebase Authentication
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.anguFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userD => resolve(userD),
          err => reject(err))
    });
  }


  // A method for the registration
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.anguFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userD => resolve(userD),
          err => reject(err));
    });
  }

  // Check wether you are logged in
  getAuthChecky() {
    return this.anguFireAuth.authState.map( auth => auth);
  }

  logMeout() {
    this.anguFireAuth.auth.signOut();
  }

}

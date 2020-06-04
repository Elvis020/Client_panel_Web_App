import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;


  constructor(
    private fireyAuth: AuthService,
    private router: Router,
    private flashyMe: FlashMessagesService
  ) { }

  ngOnInit() {
    this.fireyAuth.getAuthChecky().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.fireyAuth.login(this.email, this.password)
      .then(res => {
        this.flashyMe.show('You are now logged in', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashyMe.show(err.message, {
          cssClass: 'alert-danger', timeout: 6000
        });
      });
  }



}

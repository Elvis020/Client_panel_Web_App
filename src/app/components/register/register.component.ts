import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private fireyAuth: AuthService,
    private router: Router,
    private flashyMe: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.fireyAuth.register(this.email, this.password).then(res => {
      this.flashyMe.show('You are now logged in', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.flashyMe.show(err.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}

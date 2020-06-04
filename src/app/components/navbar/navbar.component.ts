import { SettingsService } from './../../services/settings.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authySer: AuthService,
    private flashyM: FlashMessagesService,
    private router: Router,
    private settingSer: SettingsService
  ) { }

  ngOnInit(): void {
    this.showRegister = this.settingSer.getSettings().allowRegistration;
    this.authySer.getAuthChecky().subscribe( auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;

      }
    });
  }

  onLogOutCLick() {
    this.authySer.logMeout();
    this.flashyM.show("You are now logged out", {
      cssClass:'alert-success', timeout: 4000
    });
    this.router.navigate(['/login']);
  }

}

import { SettingsService } from './../../services/settings.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {

  constructor(

    private routy: Router,
    private settingService: SettingsService
  ) { }

  canActivate(): boolean {
    if (this.settingService.getSettings().allowRegistration) {
      return true;
    } else {
      this.routy.navigate(['/login']);
      return false;
    }
  }
}

import { Settings } from './../../models/settings';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
declare const materialIndeterminate2: any;



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  setting: Settings;

  constructor(
    private flashyM: FlashMessagesService,
    private router: Router,
    private settingSer: SettingsService
  ) { }

  ngOnInit(): void {
    this.setting = this.settingSer.getSettings();
  }

  onSubby() {
    this.settingSer.changeSettings(this.setting);
    this.flashyM.show('Settings changed successfully', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/']);
  }

}

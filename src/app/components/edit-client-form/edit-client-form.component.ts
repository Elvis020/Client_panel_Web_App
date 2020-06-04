import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-edit-client-form',
  templateUrl: './edit-client-form.component.html',
  styleUrls: ['./edit-client-form.component.css']
})
export class EditClientFormComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit: boolean;

  constructor(
    private cliServy: ClientService,
    private flashyM: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private settingService: SettingsService
  ) { }

  // ngOnInit(): void {
    // Get the id from a url with the statement below
    // this.id = this.route.snapshot.paramMap.get('id');



  ngOnInit() {
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
    // Get the id from a url with the statement below
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.route.paramMap.subscribe(params => { this.id = params.get('id') });
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.cliServy.getClient(this.id).subscribe(cli => this.client = cli);
  }


  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashyM.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      });
    } else {
      // Update the client but first add the id
      value.id = this.id;
      this.cliServy.updateClientBalance(value);
      this.flashyM.show('Client details updated successfully', {
        cssClass: 'alert-success', timeout: 3000
      });

      // For redirection to client details after update
      this.router.navigate([`/client/${this.id}`]);
    }

  }
}

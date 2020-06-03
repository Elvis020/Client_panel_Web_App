import { Router } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/client';
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.css']
})
export class AddClientFormComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  @ViewChild('clientForm') form: any;

  disableBalanceOnAdd = true;

  constructor(
    private flashymsg: FlashMessagesService,
    private clienteleServy: ClientService,
    private routyR: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      // Show error message
      this.flashymsg.show('Please fill out the form correctly', {cssClass: 'alert-danger', timeout: 4000});
    } else {
      // Add new
      this.clienteleServy.addNewClient(value);
      // Show message
      this.flashymsg.show('New Client Added', {cssClass: 'alert-success', timeout: 4000});
      // Redirect to dashboard
      this.routyR.navigate(['/']);
    }
  }

}

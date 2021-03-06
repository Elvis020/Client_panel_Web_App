import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean;
  ShowBalanceUpdateInput = false;

  constructor(
    private cliServy: ClientService,
    private flashyM: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the id from a url with the statement below
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.route.snapshot.params['id'];


    // Get client
    this.cliServy.getClient(this.id).subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }

      this.client = client;
    });

  }

  onDelClick() {
    if (confirm('Are you sure?')) {
      this.cliServy.delClientfromSery(this.client);
      this.flashyM.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

  updateBalance() {
    this.cliServy.updateClientBalance(this.client);
    this.flashyM.show('Balance Updated', {
      cssClass: 'alert-success', timeout: 4000
    });

  }

}

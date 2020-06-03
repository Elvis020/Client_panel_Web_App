import { Client } from './../../models/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientelS: ClientService) { }

  ngOnInit(): void {
    this.clientelS.getClients().subscribe(incomingData =>
      {
        this.clients = incomingData;
        this.getTotalOwed();
      }
    );
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + client.balance;
    }, 0);
  }

}

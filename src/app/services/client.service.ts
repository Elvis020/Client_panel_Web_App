import { Client } from './../models/client';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientsDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private angfireStore: AngularFirestore) {
    this.clientsCollection = this.angfireStore.collection('clients',
      ref => ref.orderBy('lastName', 'asc'));

  }

  getClients() {
    this.clients = this.clientsCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });

    });
    return this.clients;
  }

  addNewClient(client: Client) {
    this.clientsCollection.add(client);

  }

  // Function to get client with id
  getClient(id: string): Observable<Client> {
    this.clientsDoc = this.angfireStore.doc<Client>(`clients/${id}`);
    this.client = this.clientsDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.client;
  }


  // A method to update the balance of a client
  updateClientBalance(client: Client) {
    this.clientsDoc = this.angfireStore.doc<Client>(`clients/${client.id}`);
    this.clientsDoc.update(client);
  }

  // Amethod to delete CLient data and metadata from the Client Array
  delClientfromSery(client: Client) {
    this.clientsDoc = this.angfireStore.doc<Client>(`clients/${client.id}`);
    this.clientsDoc.delete();

  }
}

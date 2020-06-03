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



}

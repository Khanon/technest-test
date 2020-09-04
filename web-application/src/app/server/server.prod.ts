import { Subscription } from 'rxjs';
import { Server } from '../models/server.model';

export class ServerProdService implements Server {
  $changeStatus: Subscription;
  constructor() { }

  Init(): void {
    console.log('****** Production Server ******');
  }

  Connect(): void {
  }
}

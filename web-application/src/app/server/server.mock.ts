import { Subscription } from 'rxjs';
import { Server } from '../models/server.model';

export class ServerMockService implements Server {
  $changeStatus: Subscription;
  constructor() { }

  Init(): void {
    console.log('****** Mock Server ******');
  }

  Connect(): void {
  }
}

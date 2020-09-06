import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../models/core.model';
import { SocketNgx } from '../socket/socket';
import { SocketMock } from '../socket/socket.mock';
import { SocketBase } from '../models/socket.model';

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    private serverEnvPath = './assets/server-environment.json';
    private environment: Environment;
    public socket: SocketBase;

    constructor(private http: HttpClient) { }

    init(): void {
        // Init Socket
        this.initSocket();
    }

    getLocalJsonObject(path: string) {
        return this.http.get(path);
    }

    getEnvironment(): Promise<Environment> {
        return new Promise<Environment>((success, reject) => {
            try {
                if (!this.environment) {
                    /**
                     * Just to show how server environment settings could be retrieved.
                     */
                    this.getLocalJsonObject(this.serverEnvPath).subscribe(resp => {
                        this.environment = resp as Environment;
                        // Fake loading to show the 'connecting' state
                        setTimeout(() => {
                            success(this.environment);
                        }, this.environment.fake_loading_ms);
                    });
                } else {
                    success(this.environment);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * SocketIO is not being injected on app.module because for its connection
     * it must wait to get the environment settings ('url' and 'port').
     */
    initSocket(): void {
        this.getEnvironment().then((environment) => {
            console.log('Core, environment settings:', environment);
            // This is not the finest way, test features should be out from production code.
            // They should be handled from angular.json, but for this test there's no build for
            // different environment modes, so we just run a condition here.
            // It could be used from Karma unit tests as well.
            if (environment.use_mock_server) {
                // Socket Mock (test without server)
                this.socket = new SocketMock();
            } else {
                // Socket Ngx
                this.socket = new SocketNgx(environment.server_url, environment.server_port);
            }
        }).catch(error => {
            console.log('getEnvironment Error:', error);
        });
    }

    isSocketConnected(): boolean {
        if (this.socket && this.socket.isConnected()) {
            return true;
        } else {
            return false;
        }
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../models/core.model';
import { Server } from '../models/server.model';
import { ServerMockService } from '../server/server.mock';
import { ServerProdService } from '../server/server.prod';

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    private environment: Environment;
    private server: Server;

    constructor(private http: HttpClient) { }

    init(): void {
        // Init server
        this.initServerService();
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
                    this.getLocalJsonObject('./assets/environment.json').subscribe(resp => {
                        this.environment = resp as Environment;
                        // Fake loading to show the 'connecting' state
                        setTimeout(() => {
                            success(this.environment);
                        }, this.environment.connecting_time);
                    });
                } else {
                    success(this.environment);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    initServerService(): void {
        this.getEnvironment().then((environment) => {
            console.log('Core, environment settings:', environment);
            // This is not the finest way, test features should be out from production code.
            // They should be handled from angular.json, but for this test there's no build for
            // different environment modes, so we just run a condition here.
            if (environment.use_mock_server) {
                // Test server.
                this.server = new ServerMockService();
            } else {
                // Production server
                this.server = new ServerProdService();
            }
            // Initialize server
            this.server.Init();
        }).catch(error => {
            console.log('getEnvironment Error:', error);
        });
    }

    isServerAlive(): boolean {
        if (this.server) {
            // 8a8f devolver true cuando se haya conectado mediante WebSocket al server
            return true;
        } else {
            return false;
        }
    }
}

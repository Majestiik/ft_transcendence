import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getAllClients(): Promise<any[] | undefined[]>;
    getClient(name: string): Promise<any>;
}

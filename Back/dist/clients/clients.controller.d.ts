import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getAllClients(req: any): Promise<any[] | undefined[]>;
    getClient(name: string): Promise<any | undefined>;
    registerClient(name: string): Promise<any | undefined>;
    updateClient(id: number, dataCli: any): Promise<any | undefined>;
}

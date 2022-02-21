export declare class ClientsService {
    clients: any[];
    getAllClients(): Promise<any[] | undefined[]>;
    getClient(name: string): Promise<any | undefined>;
}

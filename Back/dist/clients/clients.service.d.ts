export declare class ClientsService {
    clients: any[];
    client: any[];
    getAllClients(data: any): Promise<any[] | undefined[]>;
    getClient(name: string): Promise<any | undefined>;
    registerClient(name: string): Promise<any | undefined>;
    updateClient(id: number, dataCli: any): Promise<any[]>;
}

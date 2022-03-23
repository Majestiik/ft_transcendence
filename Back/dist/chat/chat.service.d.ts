export declare class ChatService {
    channels: any[];
    channel: any[];
    getAllChan(data: any): Promise<any[] | undefined[]>;
    getChan(id: number): Promise<any | undefined>;
    createChan(name: string): Promise<any | undefined>;
    updateChan(id: number, dataChan: any): Promise<any[]>;
}

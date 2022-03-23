import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getAllChan(req: any): Promise<any[] | undefined[]>;
    getChan(id: number): Promise<any | undefined>;
    createChan(name: string): Promise<any | undefined>;
    updateChan(id: number, dataCli: any): Promise<any | undefined>;
}

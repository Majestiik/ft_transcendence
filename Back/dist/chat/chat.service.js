"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ChatService = class ChatService {
    constructor() {
        this.channels = null;
        this.channel = null;
    }
    async getAllChan(data) {
        this.channels = (await axios_1.default.get('http://localhost:3003/chat')).data;
        return this.channels;
    }
    ;
    async getChan(id) {
        this.channel = (await axios_1.default.get('http://localhost:3003/chat/' + id)).data;
        return this.channel;
    }
    ;
    async createChan(name) {
        this.channels = (await axios_1.default.post('http://localhost:3003/chat', {
            name: name,
            topic: "Topic undefined",
            msgs: [],
            members: [],
            op: [],
            private: false,
            invitOnly: false,
            id: 0
        })).data;
        return this.channels;
    }
    ;
    async updateChan(id, dataChan) {
        this.channels = (await axios_1.default.patch('http://localhost:3003/chat/' + id, dataChan)).data;
        return this.channels;
    }
    ;
};
ChatService = __decorate([
    (0, common_1.Injectable)()
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map
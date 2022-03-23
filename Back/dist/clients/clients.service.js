"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ClientsService = class ClientsService {
    constructor() {
        this.clients = null;
        this.client = null;
    }
    async getAllClients(data) {
        this.clients = (await axios_1.default.get('http://localhost:3003/clients')).data;
        return this.clients;
    }
    ;
    async getClient(name) {
        this.client = null;
        this.clients = (await axios_1.default.get('http://localhost:3003/clients')).data;
        this.clients.forEach((cli) => {
            if (cli.name === name)
                this.client = cli;
        });
        return this.client;
    }
    ;
    async registerClient(name) {
        this.clients = (await axios_1.default.post('http://localhost:3003/clients', {
            name: name,
            avatar: "./assets/avatars/avatar1.png",
            level: 0,
            online: true,
            ingame: false,
            friends: [],
            id: 0
        })).data;
        return this.clients;
    }
    ;
    async updateClient(id, dataCli) {
        this.clients = (await axios_1.default.patch('http://localhost:3003/clients/' + id, dataCli)).data;
        return this.clients;
    }
    ;
};
ClientsService = __decorate([
    (0, common_1.Injectable)()
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
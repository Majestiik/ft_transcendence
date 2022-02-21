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
    async getAllClients() {
        this.clients = (await axios_1.default.get('http://localhost:3003/clients')).data;
        return this.clients;
    }
    ;
    async getClient(name) {
        this.clients = (await axios_1.default.get('http://localhost:3003/clients')).data;
        return this.clients.filter(u => u.name == name)[0];
    }
    ;
};
ClientsService = __decorate([
    (0, common_1.Injectable)()
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map
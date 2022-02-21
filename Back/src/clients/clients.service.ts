import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ClientsService {
	clients: any[];

	async getAllClients(data: any): Promise<any[] | undefined[]> {
		console.log(data);
		this.clients = (await axios.get('http://localhost:3003/clients')).data;
		return this.clients;
	};

	async getClient(name: string): Promise<any | undefined> {
		this.clients = (await axios.get('http://localhost:3003/clients')).data;
		return this.clients.filter(u => u.name == name)[0];
	};
}

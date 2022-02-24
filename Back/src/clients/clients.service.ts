import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ClientsService {
	clients: any[] = null;
	client: any[] = null;

	async getAllClients(data: any): Promise<any[] | undefined[]> {
		this.clients = (await axios.get('http://localhost:3003/clients')).data;
		return this.clients;
	};

	async getClient(name: string): Promise<any | undefined> {
		this.client = null;
		this.clients = (await axios.get('http://localhost:3003/clients')).data;
		this.clients.forEach((cli) => {
			if (cli.name === name)
				this.client = cli;
			//console.log(this.client);
			})
		return this.client;
		//console.log("Get client in back : " + this.clients.filter(u => u.name == name)[0].name);
		//return this.clients.filter(u => u.name == name)[0];
	};

	async registerClient(name: string): Promise<any | undefined> {
		this.clients = (await axios.post('http://localhost:3003/clients', {
			name: name,
			avatar: "./assets/avatars/avatar1.png",
			level: 0,
			online: true,
			ingame: false,
			friends: [],
			id: 0
		})).data;
		return this.clients;
	};

	async updateClient(id: number, dataCli: any) {
		this.clients = (await axios.patch('http://localhost:3003/clients/' + id, dataCli)).data;
		return this.clients;
	};
}

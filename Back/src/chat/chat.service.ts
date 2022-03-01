import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChatService {
	channels: any[] = null;
	channel: any[] = null;

	async getAllChan(data: any): Promise<any[] | undefined[]> {
		this.channels = (await axios.get('http://localhost:3003/chat')).data;
		return this.channels;
	};

	async getChan(id: number): Promise<any | undefined> {
		this.channel = (await axios.get('http://localhost:3003/chat/' + id)).data;
		return this.channel;
	};

	async createChan(name: string): Promise<any | undefined> {
		this.channels = (await axios.post('http://localhost:3003/chat', {
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
	};

	async updateChan(id: number, dataChan: any) {
		this.channels = (await axios.patch('http://localhost:3003/chat/' + id, dataChan)).data;
		return this.channels;
	};
}

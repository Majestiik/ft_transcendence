import { Controller, Get, Post, Patch, Param, Req, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get('all')
	getAllChan(@Req() req): Promise<any[] | undefined[]> {
		if (req.headers.token === 'love')
			return this.chatService.getAllChan(req.headers.token);
	} 

	@Get('one/:id')
	getChan(@Param('id') id: number): Promise<any | undefined> {
		return this.chatService.getChan(id);
	}

	@Post('create/:name')
	createChan(@Param('name') name: string): Promise<any | undefined> {
		return this.chatService.createChan(name);
	}

	@Patch('update/:id')
	updateChan(@Param('id') id: number, @Body() dataCli: any): Promise<any | undefined> {
		return this.chatService.updateChan(id, dataCli);
	}
}

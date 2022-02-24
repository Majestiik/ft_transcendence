import { Controller, Get, Post, Patch, Param, Req, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
	constructor(private readonly clientsService: ClientsService) {}

	@Get('all')
	getAllClients(@Req() req): Promise<any[] | undefined[]> {
		if (req.headers.token === 'love')
			return this.clientsService.getAllClients(req.headers.token);
	} 

	@Get('one/:name')
	getClient(@Param('name') name: string): Promise<any | undefined> {
		return this.clientsService.getClient(name);
	}

	@Post('register/:name')
	registerClient(@Param('name') name: string): Promise<any | undefined> {
		return this.clientsService.registerClient(name);
	}

	@Patch('update/:id')
	updateClient(@Param('id') id: number, @Body() dataCli: any): Promise<any | undefined> {
		return this.clientsService.updateClient(id, dataCli);
	}
}

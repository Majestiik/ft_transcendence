import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;
	
	handleConnection(client: Socket, ...args: any[]) {
		console.log(client.id + " connected");
	}
	
	handleDisconnect(client: any) {
		console.log(client.id + " disconnected");
	}

	@SubscribeMessage('msgForServ')
	sendMessage(@MessageBody() body: any): void {
		this.server.emit('msgForCli', "<" + body.cliName + ">: " + body.msg);
	}
}
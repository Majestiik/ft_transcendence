import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { ClientsModule } from './clients/clients.module';
import { configService } from './config/config.service';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ClientsModule, ChatModule/*, TypeOrmModule.forRoot(configService.getTypeOrmConfig())*/],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}

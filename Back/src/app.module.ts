import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { ClientsModule } from './clients/clients.module';
import { configService } from './config/config.service';

@Module({
  imports: [ClientsModule/*, TypeOrmModule.forRoot(configService.getTypeOrmConfig())*/],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}

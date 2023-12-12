import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { SocketGateway } from './socket/socket.gateway';
import { OpenAIService } from './openai/openai.service';


@Module({
  imports: [SocketModule],
  controllers: [AppController],
  providers: [SocketGateway, OpenAIService],
})
export class AppModule {}

import { Controller, Post, Body } from '@nestjs/common';
// import { AppService } from './app.service';
import { SocketGateway } from './socket/socket.gateway';
import { OpenAIService } from './openai/openai.service';

@Controller()
export class AppController {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async handleNewMessage(message: string, targetLanguage: string): Promise<void> {
    const translatedMessage = await this.openaiService.translate(message, targetLanguage);
    this.socketGateway.server.emit('chat-message', { message: translatedMessage });
  }

  @Post('/check-accuracy')
  async checkAccuracy(@Body('text') text: string): Promise<{ isAccurate: boolean }> {
    const isAccurate = await this.openaiService.checkAccuracy(text);
    return { isAccurate };
  }
}


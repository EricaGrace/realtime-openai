import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { OpenAIService } from './openai/openai.service';
import { SocketGateway } from './socket/socket.gateway';

describe('AppController', () => {
  let appController: AppController;
  let openaiService: OpenAIService;
  let socketGateway: SocketGateway;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [OpenAIService, SocketGateway],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    openaiService = moduleRef.get<OpenAIService>(OpenAIService);
    socketGateway = moduleRef.get<SocketGateway>(SocketGateway);
  });

  describe('handleNewMessage', () => {
    it('should translate and emit chat message', async () => {
      jest.spyOn(openaiService, 'translate').mockResolvedValue('Translated message');
      const socketEmitSpy = jest.spyOn(socketGateway.server, 'emit');
      await appController.handleNewMessage('Original message', 'fr');
      expect(openaiService.translate).toHaveBeenCalledWith('Original message', 'fr');
      expect(socketEmitSpy).toHaveBeenCalledWith('chat-message', { message: 'Translated message' });
    });
  });
});


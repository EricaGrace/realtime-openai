import { SocketGateway } from './socket/socket.gateway';
export declare class AppController {
    private readonly socketGateway;
    constructor(socketGateway: SocketGateway);
    index(): {
        message: string;
    };
    sendMessage(): void;
}

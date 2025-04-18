import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002)
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.server.emit('connection', console.log('Client connected:', client.id));
  }

  handleDisconnect(client: Socket) {
    this.server.emit(
      'disconnection',
      console.log('Client disconnected:', client.id),
    );
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket) {
    client.on('message', (message: string) => {
      console.log('Message received:', message);
      this.server.emit('message', message);
    });
  }

  @SubscribeMessage('createMessage')
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: number) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number) {
    return this.messagesService.remove(id);
  }
}

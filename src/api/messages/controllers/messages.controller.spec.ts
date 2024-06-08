import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessageService } from '../service/messages.service';
import { CreateMessageDTO } from '../dto/create-message.dto';

const mockMessageService = {
  getMessages: jest.fn(),
  getDirectChatMessages: jest.fn(),
  saveMessage: jest.fn(),
  updateMessage: jest.fn(),
  deleteMessage: jest.fn(),
};

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [{ provide: MessageService, useValue: mockMessageService }],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDirectMessages', () => {
    it('should call MessageService getDirectChatMessages with query', async () => {
      const query = { from: 'user1', to: 'user2' };
      mockMessageService.getDirectChatMessages.mockResolvedValue('result');

      const result = await controller.getDirectChatMessages(query);

      expect(mockMessageService.getDirectChatMessages).toHaveBeenCalledWith(
        query,
      );
      expect(result).toBe('result');
    });
  });

  describe('saveMessage', () => {
    it('should call MessageService saveMessage with CreateMessageDTO', async () => {
      const message: CreateMessageDTO = {
        content: {
          text: 'Hello',
          type: 'private',
        },
      } as CreateMessageDTO;
      mockMessageService.saveMessage.mockResolvedValue('saved-message');

      const result = await controller.createMessage(message);

      expect(mockMessageService.saveMessage).toHaveBeenCalledWith(message);
      expect(result).toBe('saved-message');
    });
  });

  describe('deleteMessage', () => {
    it('should call MessageService deleteMessage with messageId', async () => {
      const messageId = 'message-id';
      mockMessageService.deleteMessage.mockResolvedValue('deleted-message');

      const result = await controller.deleteMessage(messageId);

      expect(mockMessageService.deleteMessage).toHaveBeenCalledWith(messageId);
      expect(result).toBe('deleted-message');
    });
  });
});

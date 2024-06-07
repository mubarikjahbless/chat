import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageService } from './messages.service';
import { MessageModel } from '../../../common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';
import { CreateMessageDTO } from '../dto/create-message.dto';

const mockMessageModel = {
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
  aggregate: jest.fn(),
};

const mockApiResponseService = {
  successResponseWithData: jest.fn(),
  successResponse: jest.fn(),
  notFoundResponse: jest.fn(),
};

describe('MessageService', () => {
  let service: MessageService;
  let model: Model<MessageModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: getModelToken(MessageModel.name), useValue: mockMessageModel },
        { provide: ApiResponseService, useValue: mockApiResponseService },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    model = module.get<Model<MessageModel>>(getModelToken(MessageModel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMessages', () => {
    it('should return messages based on the condition', async () => {
      const messages = [{ message: 'Message1' }, { message: 'Message2' }];
      mockMessageModel.find.mockReturnValue({ populate: jest.fn().mockReturnValue(messages) });

       await service.getMessages({});

      expect(mockMessageModel.find).toHaveBeenCalledWith({});
      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('successful', messages);
    });
  });

  describe('getDirectChatMessages', () => {
    it('should return direct chat messages based on the condition', async () => {
      const messages = [{ message: 'Message1' }];
      mockMessageModel.aggregate.mockResolvedValue(messages);

     await service.getDirectChatMessages({ from: 'user1', to: 'user2' });

      expect(mockMessageModel.aggregate).toHaveBeenCalledWith([
        { $match: { from: 'user1', to: 'user2' } },
        { $lookup: { from: 'User', localField: 'from', foreignField: '_id', as: 'fromUserDetails' } },
        { $lookup: { from: 'User', localField: 'to', foreignField: '_id', as: 'toUserDetails' } },
        { $project: { _id: 1, message: 1, content: 1, profileInfo: { $arrayElemAt: ['$fromUserDetails', 0] } } }
      ]);

      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('success', messages);
    });
  });

  describe('getallMessages', () => {
    it('should return all messages', async () => {
      const messages = [{ message: 'Message1' }, { message: 'Message2' }];
      mockMessageModel.find.mockResolvedValue(messages);

     await service.getallMessages();

      expect(mockMessageModel.find).toHaveBeenCalled();
      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('success', messages);
    });
  });

  describe('saveMessage', () => {
    it('should save a message and return it', async () => {
      const message = { content:{ text:'hi'} } as  CreateMessageDTO;
      mockMessageModel.create.mockResolvedValue(message);

     await service.saveMessage(message);

      expect(mockMessageModel.create).toHaveBeenCalledWith(message);
      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('successful', message);
    });
  });

  describe('updateMessage', () => {
    it('should update a message and return a success response', async () => {
      const data = { id: 'some-id', message: 'Updated message' };
      mockMessageModel.findByIdAndUpdate.mockResolvedValue(data);

       await service.updateMessage(data);

      expect(mockMessageModel.findByIdAndUpdate).toHaveBeenCalledWith(data.id, { $set: { ...data } });
      expect(mockApiResponseService.successResponse).toHaveBeenCalledWith('successful');
    });

    it('should return a not found response if message is not found', async () => {
      const data = { id: 'some-id', message: 'Updated message' };
      mockMessageModel.findByIdAndUpdate.mockResolvedValue(null);

     await service.updateMessage(data);

      expect(mockApiResponseService.notFoundResponse).toHaveBeenCalled();
    });
  });

  describe('deleteMessage', () => {
    it('should delete a message and return a success response', async () => {
      mockMessageModel.findByIdAndDelete.mockResolvedValue(true);

       await service.deleteMessage('some-id');

      expect(mockMessageModel.findByIdAndDelete).toHaveBeenCalledWith('some-id');
      expect(mockApiResponseService.successResponse).toHaveBeenCalledWith('successfully deleted');
    });

    it('should return a not found response if message is not found', async () => {
      mockMessageModel.findByIdAndDelete.mockResolvedValue(null);

      await service.deleteMessage('some-id');

      expect(mockApiResponseService.notFoundResponse).toHaveBeenCalled();
    });
  });
});

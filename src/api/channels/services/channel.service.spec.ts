import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelModel } from '../../../common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';
import { ChannelService } from './channel.service';

const mockChannelModel = {
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const mockApiResponseService = {
  successResponseWithData: jest.fn(),
  successResponse: jest.fn(),
  notFoundResponse: jest.fn(),
  errorResponse: jest.fn(),
};

describe('ChannelService', () => {
  let service: ChannelService;
  let model: Model<ChannelModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        { provide: getModelToken(ChannelModel.name), useValue: mockChannelModel },
        { provide: ApiResponseService, useValue: mockApiResponseService },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    model = module.get<Model<ChannelModel>>(getModelToken(ChannelModel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getChannels', () => {
    it('should return all channels', async () => {
      const channels = [{ name: 'Channel1' }, { name: 'Channel2' }];
      mockChannelModel.find.mockReturnValue(channels);

      await service.getChannels();

      expect(mockChannelModel.find).toHaveBeenCalled();
      expect(
        mockApiResponseService.successResponseWithData,
      ).toHaveBeenCalledWith('all channels', channels);
    });
  });

  describe('searchChannel', () => {
    it('should return channels matching search key', async () => {
      const channels = [{ name: 'Channel1' }];
      mockChannelModel.find.mockResolvedValue(channels);

      await service.searchChannel('Channel');

      expect(mockChannelModel.find).toHaveBeenCalledWith({
        name: { $regex: new RegExp('.*Channel.*') },
      });
      expect(
        mockApiResponseService.successResponseWithData,
      ).toHaveBeenCalledWith('query result', channels);
    });
  });

  describe('getChannelById', () => {
    it('should return channel by ID', async () => {
      const channel = { name: 'Channel1', _id: '507f1f77bcf86cd799439011' };
      mockChannelModel.findById.mockResolvedValue(channel);

      await service.getChannelById('507f1f77bcf86cd799439011');

      expect(mockChannelModel.findById).toHaveBeenCalledWith({
        _id: expect.anything(),
      });
      expect(
        mockApiResponseService.successResponseWithData,
      ).toHaveBeenCalledWith('', channel);
    });
  });
});

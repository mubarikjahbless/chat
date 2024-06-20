import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ChannelModel } from '../../../common/models';
import { CreateChannelDTO } from '../dto/create-channel.dto';
import { UpdateChannelDTO } from '../dto/update-channel.dto';
import { ChannelService } from '../services/channel.service';
import { ChannelsController } from './channels.controller';


const mockChannelService = {
  searchChannel: jest.fn(),
  getChannelById: jest.fn(),
  createChannel: jest.fn(),
  joinChannel: jest.fn(),
  updateChannelInfo: jest.fn(),
  deleteChannel: jest.fn(),
};

describe('ChannelsController', () => {
  let controller: ChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelsController],
      providers: [
        { provide: getModelToken(ChannelModel.name), useValue: {} },
        { provide: ChannelService, useValue: mockChannelService },
      ],
    }).compile();

    controller = module.get<ChannelsController>(ChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchChannel', () => {
    it('should call ChannelService searchChannel with query', async () => {
      const searchQuery = 'some-query';
      mockChannelService.searchChannel.mockResolvedValue('result');

      const result = await controller.searchChannel(searchQuery);

      expect(mockChannelService.searchChannel).toHaveBeenCalledWith(searchQuery);
      expect(result).toBe('result');
    });
  });

  describe('findChannelById', () => {
    it('should call ChannelService getChannelById with ID', async () => {
      const id = 'some-id';
      mockChannelService.getChannelById.mockResolvedValue('channel');

      const result = await controller.findChannelById(id);

      expect(mockChannelService.getChannelById).toHaveBeenCalledWith(id);
      expect(result).toBe('channel');
    });
  });

  describe('save', () => {
    it('should call ChannelService createChannel with CreateChannelDTO', async () => {
      const channel: CreateChannelDTO = { name: 'Channel1' } as CreateChannelDTO;
      mockChannelService.createChannel.mockResolvedValue('created-channel');

      const result = await controller.save(channel);

      expect(mockChannelService.createChannel).toHaveBeenCalledWith(channel);
      expect(result).toBe('created-channel');
    });
  });

  describe('joinGroup', () => {
    it('should call ChannelService joinChannel with data and channelId', async () => {
      const data = { user: 'user-id' };
      const id = 'channel-id';
      mockChannelService.joinChannel.mockResolvedValue('joined-channel');

      const result = await controller.joinGroup(data, id);

      expect(mockChannelService.joinChannel).toHaveBeenCalledWith(data, id);
      expect(result).toBe('joined-channel');
    });
  });

  describe('updateChannel', () => {
    it('should call ChannelService updateChannelInfo with UpdateChannelDTO and channelId', async () => {
      const channel: UpdateChannelDTO = { name: 'Updated Channel' } as UpdateChannelDTO;
      const id = 'channel-id';
      mockChannelService.updateChannelInfo.mockResolvedValue('updated-channel');

      const result = await controller.updateChannel(channel, id);

      expect(mockChannelService.updateChannelInfo).toHaveBeenCalledWith(channel, id);
      expect(result).toBe('updated-channel');
    });
  });

  describe('deleteChannel', () => {
    it('should call ChannelService deleteChannel with channelId', async () => {
      const id = 'channel-id';
      mockChannelService.deleteChannel.mockResolvedValue('deleted-channel');

      const result = await controller.deleteChannel(id);

      expect(mockChannelService.deleteChannel).toHaveBeenCalledWith(id);
      expect(result).toBe('deleted-channel');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomService } from './room.service';
import { RoomModel } from '../../../common/models';
import { ApiResponseService } from '../../../common/utility/api-response.service';



const mockRoomModel = {
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

describe('RoomService', () => {
  let service: RoomService;
  let model: Model<RoomModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        { provide: getModelToken(RoomModel.name), useValue: mockRoomModel },
        { provide: ApiResponseService, useValue: mockApiResponseService },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    model = module.get<Model<RoomModel>>(getModelToken(RoomModel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRooms', () => {
    it('should return all rooms', async () => {
      const rooms = [{ name: 'Room1' }, { name: 'Room2' }];
      mockRoomModel.find.mockReturnValue(rooms);

     await service.getRooms();

      expect(mockRoomModel.find).toHaveBeenCalled();
      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('all rooms', rooms);
    });
  });

  describe('searchRoom', () => {
    it('should return rooms matching search key', async () => {
      const rooms = [{ name: 'Room1' }];
      mockRoomModel.find.mockResolvedValue(rooms);

      await service.searchRoom('Room');

      expect(mockRoomModel.find).toHaveBeenCalledWith({ name: { $regex: new RegExp('.*Room.*') } });
      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('query result', rooms);
    });
  });

  describe('getRoomById', () => {
    it('should return room by ID', async () => {
      const room = { name: 'Room1', _id:'507f1f77bcf86cd799439011' };
      mockRoomModel.findById.mockResolvedValue(room);

      await service.getRoomById('507f1f77bcf86cd799439011');

      expect(mockRoomModel.findById).toHaveBeenCalledWith({ _id: expect.anything() });
      expect(mockApiResponseService.successResponseWithData).toHaveBeenCalledWith('', room);
    });
  });

});
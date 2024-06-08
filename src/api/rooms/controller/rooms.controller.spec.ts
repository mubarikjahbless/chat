import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RoomsController } from './rooms.controller';
import { RoomService } from '../services/room.service';
import { RoomModel } from '../../../common/models';
import { CreateRoomDTO } from '../dto/create-room.dto';
import { UpdateRoomDTO } from '../dto/update-room.dto';

const mockRoomService = {
  searchRoom: jest.fn(),
  getRoomById: jest.fn(),
  createRoom: jest.fn(),
  joinRoom: jest.fn(),
  updateRoomInfo: jest.fn(),
  deleteRoom: jest.fn(),
};

describe('RoomsController', () => {
  let controller: RoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomsController],
      providers: [
        { provide: getModelToken(RoomModel.name), useValue: {} },
        { provide: RoomService, useValue: mockRoomService },
      ],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchRoom', () => {
    it('should call RoomService searchRoom with query', async () => {
      const searchQuery = 'some-query';
      mockRoomService.searchRoom.mockResolvedValue('result');

      const result = await controller.searchRoom(searchQuery);

      expect(mockRoomService.searchRoom).toHaveBeenCalledWith(searchQuery);
      expect(result).toBe('result');
    });
  });

  describe('findRoomById', () => {
    it('should call RoomService getRoomById with ID', async () => {
      const id = 'some-id';
      mockRoomService.getRoomById.mockResolvedValue('room');

      const result = await controller.findRoomById(id);

      expect(mockRoomService.getRoomById).toHaveBeenCalledWith(id);
      expect(result).toBe('room');
    });
  });

  describe('save', () => {
    it('should call RoomService createRoom with CreateRoomDTO', async () => {
      const room: CreateRoomDTO = { name: 'Room1' } as CreateRoomDTO;
      mockRoomService.createRoom.mockResolvedValue('created-room');

      const result = await controller.save(room);

      expect(mockRoomService.createRoom).toHaveBeenCalledWith(room);
      expect(result).toBe('created-room');
    });
  });

  describe('joinGroup', () => {
    it('should call RoomService joinRoom with data and roomId', async () => {
      const data = { user: 'user-id' };
      const id = 'room-id';
      mockRoomService.joinRoom.mockResolvedValue('joined-room');

      const result = await controller.joinGroup(data, id);

      expect(mockRoomService.joinRoom).toHaveBeenCalledWith(data, id);
      expect(result).toBe('joined-room');
    });
  });

  describe('updateRoom', () => {
    it('should call RoomService updateRoomInfo with UpdateRoomDTO and roomId', async () => {
      const room: UpdateRoomDTO = { name: 'Updated Room' } as UpdateRoomDTO;
      const id = 'room-id';
      mockRoomService.updateRoomInfo.mockResolvedValue('updated-room');

      const result = await controller.updateRoom(room, id);

      expect(mockRoomService.updateRoomInfo).toHaveBeenCalledWith(room, id);
      expect(result).toBe('updated-room');
    });
  });

  describe('deleteRoom', () => {
    it('should call RoomService deleteRoom with roomId', async () => {
      const id = 'room-id';
      mockRoomService.deleteRoom.mockResolvedValue('deleted-room');

      const result = await controller.deleteRoom(id);

      expect(mockRoomService.deleteRoom).toHaveBeenCalledWith(id);
      expect(result).toBe('deleted-room');
    });
  });
});

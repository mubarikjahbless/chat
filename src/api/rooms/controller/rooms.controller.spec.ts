import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomService } from '../services/room.service';
import { Room } from 'src/common/models';

describe('Rooms Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RoomsController],
      imports:[Room],
      providers: [RoomService]
    }).compile();
  });
  it('should be defined', () => {
    const controller: RoomsController = module.get<RoomsController>(RoomsController);
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { RoomService } from "./room.service";


describe('Room Service', () => {
    let module: TestingModule;
    
    beforeAll(async () => {
      module = await Test.createTestingModule({
        providers: [RoomService],
      }).compile();
    });
    
    it('should be defined', () => {
      const roomService: RoomService = module.get<RoomService>(RoomService);
      expect(roomService).toBeDefined();
    });
  });
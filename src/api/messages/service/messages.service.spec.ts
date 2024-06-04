import { Test, TestingModule } from "@nestjs/testing";
import { MessageService } from "./messages.service";
import { Message } from "src/common/models";


describe('Messages Service', () => {
    let messageService: MessageService

    beforeAll(async () => {
     const  module: TestingModule = await Test.createTestingModule({
        imports:[Message],
        providers: [MessageService],
    }).compile();

     messageService= module.get<MessageService>(MessageService);

    });

    it('should be defined', () => {
      expect(messageService).toBeDefined();
    });
  });
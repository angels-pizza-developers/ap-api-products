import { Test, TestingModule } from "@nestjs/testing";
import { AccessTypeService } from "./access.service";

describe("AccessTypeService", () => {
  let service: AccessTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessTypeService],
    }).compile();

    service = module.get<AccessTypeService>(AccessTypeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

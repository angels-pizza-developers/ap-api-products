import { Test, TestingModule } from "@nestjs/testing";
import { DriverUserService } from "./driver-user.service";

describe("DriverUserService", () => {
  let service: DriverUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverUserService],
    }).compile();

    service = module.get<DriverUserService>(DriverUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

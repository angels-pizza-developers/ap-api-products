import { Test, TestingModule } from "@nestjs/testing";
import { DriverUserController } from "./driver-user.controller";
import { DriverUserService } from "./driver-user.service";

describe("DriverUserController", () => {
  let controller: DriverUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverUserController],
      providers: [DriverUserService],
    }).compile();

    controller = module.get<DriverUserController>(DriverUserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

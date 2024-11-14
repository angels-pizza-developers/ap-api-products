import { Test, TestingModule } from "@nestjs/testing";
import { BranchUserController } from "./branch-user.controller";
import { BranchUserService } from "./branch-user.service";

describe("BranchUserController", () => {
  let controller: BranchUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchUserController],
      providers: [BranchUserService],
    }).compile();

    controller = module.get<BranchUserController>(BranchUserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

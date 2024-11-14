import { Test, TestingModule } from "@nestjs/testing";
import { BranchUserService } from "./branch-user.service";

describe("BranchUserService", () => {
  let service: BranchUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchUserService],
    }).compile();

    service = module.get<BranchUserService>(BranchUserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

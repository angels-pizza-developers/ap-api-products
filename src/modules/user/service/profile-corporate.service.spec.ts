import { Test, TestingModule } from '@nestjs/testing';
import { ProfileCorporateService } from './profile-corporate.service';

describe('ProfileCorporateService', () => {
  let service: ProfileCorporateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileCorporateService],
    }).compile();

    service = module.get<ProfileCorporateService>(ProfileCorporateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HolidayRatesService } from './holiday-rates.service';

describe('HolidayRatesService', () => {
  let service: HolidayRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HolidayRatesService],
    }).compile();

    service = module.get<HolidayRatesService>(HolidayRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

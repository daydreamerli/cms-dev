import { Test, TestingModule } from '@nestjs/testing';
import { HolidayRatesController } from './holiday-rates.controller';
import { HolidayRatesService } from './holiday-rates.service';

describe('HolidayRatesController', () => {
  let controller: HolidayRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidayRatesController],
      providers: [HolidayRatesService],
    }).compile();

    controller = module.get<HolidayRatesController>(HolidayRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

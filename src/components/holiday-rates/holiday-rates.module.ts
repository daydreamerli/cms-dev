import { Module } from '@nestjs/common';
import { HolidayRatesService } from './holiday-rates.service';
import { HolidayRatesController } from './holiday-rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidayRate } from './entities/holiday-rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HolidayRate])],
  controllers: [HolidayRatesController],
  providers: [HolidayRatesService]
})
export class HolidayRatesModule {}

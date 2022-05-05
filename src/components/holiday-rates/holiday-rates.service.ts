import { Injectable } from '@nestjs/common';
import { CreateHolidayRateDto } from './dto/create-holiday-rate.dto';
import { UpdateHolidayRateDto } from './dto/update-holiday-rate.dto';

@Injectable()
export class HolidayRatesService {
  create(createHolidayRateDto: CreateHolidayRateDto) {
    return 'This action adds a new holidayRate';
  }

  findAll() {
    return `This action returns all holidayRates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} holidayRate`;
  }

  update(id: number, updateHolidayRateDto: UpdateHolidayRateDto) {
    return `This action updates a #${id} holidayRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} holidayRate`;
  }
}

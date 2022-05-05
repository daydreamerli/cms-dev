import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HolidayRatesService } from './holiday-rates.service';
import { CreateHolidayRateDto } from './dto/create-holiday-rate.dto';
import { UpdateHolidayRateDto } from './dto/update-holiday-rate.dto';

@Controller('holiday-rates')
export class HolidayRatesController {
  constructor(private readonly holidayRatesService: HolidayRatesService) {}

  @Post()
  create(@Body() createHolidayRateDto: CreateHolidayRateDto) {
    return this.holidayRatesService.create(createHolidayRateDto);
  }

  @Get()
  findAll() {
    return this.holidayRatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidayRatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayRateDto: UpdateHolidayRateDto) {
    return this.holidayRatesService.update(+id, updateHolidayRateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidayRatesService.remove(+id);
  }
}

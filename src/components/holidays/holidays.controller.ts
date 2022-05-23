import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { query } from 'express';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.holidaysService.create(createHolidayDto);
  }

  @Get()
  findAll() {
    return this.holidaysService.findAll();
  }

  @Get(':siteId/today')
  isTodayHoliday(@Param('siteId') siteId: number) {
    return this.holidaysService.isTodayHoliday(siteId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(+id);
  }

  @Get('rate/:id')
  findRateHolidays(@Param('id') id: string) {
    return this.holidaysService.findRateHolidays(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidaysService.update(+id, updateHolidayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(+id);
  }
}

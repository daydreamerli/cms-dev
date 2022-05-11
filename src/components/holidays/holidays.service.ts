import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';

@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepo: Repository<Holiday>,
  ) {}

  public async create(createHolidayDto: CreateHolidayDto) {
    const holidayRateId = createHolidayDto.holidayRateId;
    const existingHoliday = this.holidayRepo.findOne({
      where: { holidayName: createHolidayDto.holidayName },
    });
    if (existingHoliday) {
      return existingHoliday;
    }
    const newHoliday = this.holidayRepo.create(createHolidayDto);
    await this.holidayRepo.save(newHoliday);
    // add joinColumn with holidayRate table
    // eslint-disable-next-line prettier/prettier
    await getConnection()
      .createQueryBuilder()
      .relation(Holiday, 'holidayRate')
      .of(newHoliday)
      .set(holidayRateId);
    return newHoliday;
  }

  public async isTodayHoliday() {
    const timeNow = new Date();
    const today = new Date(timeNow).toLocaleDateString();
    const holiday = await this.holidayRepo.findOne({
      where: { startAt: today },
    });
    if (holiday) {
      return holiday.holidayRateId;
    } else {
      return false;
    }
  }

  findAllByHRateId(holidayRateId: number) {
    return this.holidayRepo.find({
      where: { holidayRateId },
    });
  }

  findAll() {
    return `This action returns all holidays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} holiday`;
  }

  update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return `This action updates a #${id} holiday`;
  }

  remove(id: number) {
    return `This action removes a #${id} holiday`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, createQueryBuilder, getConnection, Repository } from 'typeorm';
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
    const existingHoliday = await this.holidayRepo
      .createQueryBuilder('holiday')
      .where('startAt = :startAt', {
        startAt: createHolidayDto.startAt,
      })
      .andWhere('siteId = :siteId', { siteId: createHolidayDto.siteId })
      .getOne();
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

    await getConnection()
      .createQueryBuilder()
      .relation(Holiday, 'site')
      .of(newHoliday)
      .set(createHolidayDto.siteId);
    return newHoliday;
  }

  public async isTodayHoliday(siteId: number) {
    const time = new Date();
    const isoTime = new Date(time);
    isoTime.setHours(isoTime.getHours() + 12);
    const today = new Date(isoTime).toISOString().slice(0, 10);
    console.log(isoTime.toDateString());
    console.log(today);
    const holiday = await this.holidayRepo
      .createQueryBuilder('holiday')
      .where('startAt = :startAt', {
        startAt: today,
      })
      .andWhere('siteId = :siteId', { siteId })
      .getOne();
    if (holiday) {
      return this.holidayRepo
        .createQueryBuilder('holiday')
        .leftJoinAndSelect('holiday.holidayRate', 'holidayRate')
        .where('startAt = :startAt', { startAt: today })
        .getOne();
      // return holiday;
    } else {
      return holiday;
    }
  }

  public async findRateHolidays(id: number) {
    const holidays = await this.holidayRepo
      .createQueryBuilder('holiday')
      // .leftJoinAndSelect('holiday.holidayRate', 'holidayRate')
      .where('holidayRateId = :holidayRateId', { holidayRateId: id })
      .getMany();
    // const holidays = await this.holidayRepo.find({
    //   relations: ['holidayRate'],
    //   where: { holidayRate: { id: id } },
    // });
    // with leftJoinAndSelect will include related holidayRate data 
    return holidays;
  }

  public async findSiteHolidays(siteId: number) {
    const siteHolidays = await this.holidayRepo.find({
      relations: ['site'],
      where: { site: { id: siteId } },
    });
    return siteHolidays;
  }

  public async findAll() {
    return await this.holidayRepo.find();
  }

  public async findOne(id: number) {
    return await this.holidayRepo.findOne(id);
  }

  update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return `This action updates a #${id} holiday`;
  }

  remove(id: number) {
    return `This action removes a #${id} holiday`;
  }
}



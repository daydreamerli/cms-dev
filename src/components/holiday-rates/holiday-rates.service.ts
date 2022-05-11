import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateHolidayRateDto } from './dto/create-holiday-rate.dto';
import { UpdateHolidayRateDto } from './dto/update-holiday-rate.dto';
import { HolidayRate } from './entities/holiday-rate.entity';

@Injectable()
export class HolidayRatesService {
  constructor(
    @InjectRepository(HolidayRate)
    private readonly holidayRateRepo: Repository<HolidayRate>,
  ) {}

  public async create(createHolidayRateDto: CreateHolidayRateDto) {
    const siteId = createHolidayRateDto.siteId;
    const existingHolidayRate = this.holidayRateRepo.findOne({
      where: { rateName: createHolidayRateDto.rateName },
    });
    if (existingHolidayRate) {
      return existingHolidayRate;
    }
    const newHolidayRate = this.holidayRateRepo.create(createHolidayRateDto);
    await this.holidayRateRepo.save(newHolidayRate);
    // add joinColumn with holidayRate table
    // eslint-disable-next-line prettier/prettier
    await getConnection()
      .createQueryBuilder()
      .relation(HolidayRate, 'site')
      .of(newHolidayRate)
      .set(siteId);
    return newHolidayRate;
  }

  public async findOne(id: number) {
    return await this.holidayRateRepo.findOne(id);
  }

  findAllHolidayRatesBySiteId(siteId: number) {
    return this.holidayRateRepo.find({ where: { siteId } });
  }

  public async findAll() {
    return await this.holidayRateRepo.find();
  }

  update(id: number, updateHolidayRateDto: UpdateHolidayRateDto) {
    return `This action updates a #${id} holidayRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} holidayRate`;
  }
}

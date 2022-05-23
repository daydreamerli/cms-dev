/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Site } from './entities/site.entity';

@Injectable()
export class SitesService {
  constructor(
    @InjectRepository(Site)
    private readonly siteRepo: Repository<Site>,
  ) {}

  public async create(createSiteDto: CreateSiteDto): Promise<Partial<Site>> {
    const ownerId = createSiteDto.ownerId;
    console.log('Get New Site Data', createSiteDto);
    const existingSite = await this.siteRepo.findOne({
      where: { siteName: createSiteDto.siteName },
    });
    if (existingSite) {
      return {
        id: existingSite.id,
        siteName: existingSite.siteName,
        address: existingSite.address,
        spotsNum: existingSite.spotsNum,
        baseTime: existingSite.baseTime,
        casualRate: existingSite.casualRate,
        dailyMax: existingSite.dailyMax,
        weekendMax: existingSite.weekendMax,
      };
    }
    // to-do add relationship builder to add owner to site
    const newSite = this.siteRepo.create(createSiteDto);
    await this.siteRepo.save(newSite);
    await getConnection()
      .createQueryBuilder()
      .relation(Site, 'owner')
      .of(newSite)
      .set(ownerId);
    return {
      id: newSite.id,
      siteName: newSite.siteName,
      address: newSite.address,
      spotsNum: newSite.spotsNum,
      baseTime: newSite.baseTime,
      casualRate: newSite.casualRate,
      dailyMax: newSite.dailyMax,
      weekendMax: newSite.weekendMax,
    };
  }

  public async findAll() {
    return await this.siteRepo.find({});
  }

  public async findOne(id: number) {
    return await this.siteRepo.findOne(id);
  }

  public async findSiteHRates(siteId: number) {
    const siteHolidayRates = await this.siteRepo
      .createQueryBuilder('site')
      .leftJoinAndSelect('site.holidayRates', 'holidayRates')
      .where('site.id = :siteId', { siteId })
      .getMany();
    return siteHolidayRates;
  }

  public async findSiteHolidays(siteId: number) {
    const siteHolidays = await this.siteRepo
      .createQueryBuilder('site')
      .leftJoinAndSelect('site.holidays', 'holidays')
      .where('site.id = :siteId', { siteId })
      .getMany();
    return siteHolidays;
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}

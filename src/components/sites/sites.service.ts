import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    console.log('Get New Site Data', createSiteDto);
    const existingSite = this.siteRepo.findOne({
      where: { siteName: createSiteDto.siteName },
    });
    if (existingSite) {
      return existingSite;
    }
    const newSite = this.siteRepo.create(createSiteDto);
    await this.siteRepo.save(newSite);
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

  findAll() {
    return `This action returns all sites`;
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}

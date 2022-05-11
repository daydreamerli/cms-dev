import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,
  ) {}

  public async create(createOfferDto: CreateOfferDto) {
    const siteId = createOfferDto.siteId;
    const existingOffer = await this.offerRepo.findOne({
      where: { offerName: createOfferDto.offerName },
    });
    if (existingOffer) {
      return existingOffer;
    }
    const newOffer = this.offerRepo.create(createOfferDto);
    await this.offerRepo.save(newOffer);
    // add joinColumn with site table
    await getConnection()
      .createQueryBuilder()
      .relation(Offer, 'site')
      .of(newOffer)
      .set(siteId);
    return newOffer;
  }

  public async getSiteOffers(siteId: number) {
    return await this.offerRepo.find({
      where: { siteId },
    });
  }

  public async getCurrentOffer(siteId: number) {
    const now = new Date();
    const timeNow = new Date(now).toLocaleTimeString();
    console.log(timeNow);
    console.log(typeof timeNow);
    const siteOffers = await this.getSiteOffers(siteId);
    if (siteOffers.length === 0) {
      return new HttpException('No order found', HttpStatus.NOT_FOUND);
    }
    console.log(siteOffers);
    const currentOffer = siteOffers.find((offer) => {
      const offerStartDate = offer.startAt as unknown as string;
      console.log(offerStartDate);
      console.log(typeof offerStartDate);
      const offerEndDate = offer.endAt as unknown as string;
      console.log(offerEndDate);
      if (offerStartDate <= timeNow && offerEndDate >= timeNow) {
        return offer;
      }
    });
    if (!currentOffer) {
      return new HttpException('No order found', HttpStatus.NOT_FOUND);
    }
    return currentOffer;
  }

  public async getActiveOffer() {
    return await this.offerRepo.findOne({
      where: { active: true },
    });
  }

  public async findAll() {
    return await this.offerRepo.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}

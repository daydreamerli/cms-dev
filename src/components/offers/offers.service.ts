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
    const offerName = createOfferDto.offerName;
    const existingOffer = await this.offerRepo
      .createQueryBuilder('offer')
      .where('offerName = :offerName', { offerName })
      .andWhere('siteId = :siteId', { siteId })
      .getOne();
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

  public async getSiteOffers(siteId: number): Promise<Offer[]> {
    const siteOffers = await this.offerRepo
      .createQueryBuilder('offer')
      .where('siteId = :siteId', { siteId })
      .getMany();
    // if (siteOffers.length === 0) {
    //   throw new HttpException(
    //     'No offers found for this site',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    return siteOffers;
  }

  public async getCurrentOffer(siteId: number) {
    // to-do need add weekday or weekend check
    const now = new Date();
    const timeNow = new Date(now).toLocaleTimeString();
    console.log(timeNow);
    const siteOffers = await this.offerRepo
      .createQueryBuilder('offer')
      .where('siteId = :siteId', { siteId })
      .getMany();
    console.log(siteOffers);
    if (siteOffers.length === 0) {
      return new HttpException(
        'No Offer found for this Site',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(siteOffers);
    const currentOffer = siteOffers.find((offer) => {
      const offerStartDate = offer.startAt as unknown as string;
      console.log(offerStartDate);
      const offerEndDate = offer.endAt as unknown as string;
      console.log(offerEndDate);
      if (offerStartDate <= timeNow && offerEndDate >= timeNow) {
        return offer;
      }
    });
    if (!currentOffer) {
      return new HttpException('No Offer ATM', HttpStatus.NOT_FOUND);
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

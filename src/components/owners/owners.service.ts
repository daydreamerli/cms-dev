import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>
  ) {}

  public async create(createOwnerDto: CreateOwnerDto) {
    const existingOwner = await this.ownerRepo.findOne({ where: { email: createOwnerDto.email } });
    if (existingOwner) {
      return existingOwner;
    }
    const newOwner = this.ownerRepo.create(createOwnerDto);
    await this.ownerRepo.save(newOwner);
    return newOwner;
  }

  findAll() {
    return `This action returns all owners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}

import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { OwnerProfile } from './entities/owner-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, OwnerProfile])],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}

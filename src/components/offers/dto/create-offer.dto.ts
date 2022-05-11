import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty()
  @IsNumber()
  readonly siteId: number;

  @ApiProperty()
  @IsString()
  readonly offerName: string;

  @ApiProperty()
  @IsNumber()
  readonly sequences: number;

  @ApiProperty()
  @IsNumber()
  readonly charge: number;

  @ApiProperty()
  @IsNumber()
  readonly validateHours: number;

  @ApiProperty()
  @IsDateString()
  readonly startAt: Date;

  @ApiProperty()
  @IsDateString()
  readonly endAt: Date;
}


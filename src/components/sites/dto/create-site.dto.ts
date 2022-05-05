import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateSiteDto {
  @ApiProperty()
  @IsNumber()
  readonly ownerId: number;

  @ApiProperty()
  @IsNumber()
  readonly siteName: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsNumber()
  readonly spotsNum: number;

  @ApiProperty()
  @IsNumber()
  readonly baseTime: number;

  @ApiProperty()
  @IsNumber()
  readonly casualRate: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly dailyMax: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly weekendMax: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly image: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly latitude: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly longitude: string;
}

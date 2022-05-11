import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHolidayRateDto {
  @IsNumber()
  readonly siteId: number;

  @IsString()
  readonly rateName: string;

  @IsNumber()
  readonly hourlyRate: number;

  @IsNumber()
  readonly dailyMax: number;

  @IsNumber()
  @IsOptional()
  readonly specialRate: number;
}

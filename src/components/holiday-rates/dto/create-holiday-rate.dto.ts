import { IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateHolidayRateDto {
  @IsNumber()
  readonly siteId: number;

  @IsNumber()
  readonly hourlyRate: number;

  @IsNumber()
  readonly dailyMax: number;

  @IsDateString()
  readonly startAt: Date;

  @IsNumber()
  @IsOptional()
  readonly specialRate: number;
}

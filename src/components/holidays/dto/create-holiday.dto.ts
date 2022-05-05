import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateHolidayDto {
  @IsString()
  readonly holidayName: string; // Holiday name or abbreviation

  @IsNumber()
  readonly holidayRateId: number;

  @IsDateString()
  readonly startAt: Date;

  @IsDateString()
  @IsOptional()
  readonly endAt: Date;
}

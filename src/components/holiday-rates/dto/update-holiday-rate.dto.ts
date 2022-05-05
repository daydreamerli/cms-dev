import { PartialType } from '@nestjs/mapped-types';
import { CreateHolidayRateDto } from './create-holiday-rate.dto';

export class UpdateHolidayRateDto extends PartialType(CreateHolidayRateDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  readonly siteId: number;

  @ApiProperty()
  @IsString()
  readonly rego: string;

  @ApiProperty()
  @IsNumber()
  readonly paidHours: number;

  @ApiProperty()
  @IsNumber()
  readonly payment: number;

  @ApiProperty()
  @IsDate()
  readonly validateTime: Date;
}

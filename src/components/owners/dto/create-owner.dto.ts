import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  readonly ownerName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsString()
  readonly contactNum: string;

}

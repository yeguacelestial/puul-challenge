import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FilterUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

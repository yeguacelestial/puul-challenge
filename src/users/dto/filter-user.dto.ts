import { IsEmail, IsString } from 'class-validator';

export class FilterUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

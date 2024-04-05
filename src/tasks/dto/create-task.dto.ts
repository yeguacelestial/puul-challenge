import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FilterUserDto } from 'src/users/dto/filter-user.dto';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  estimated_hours: number;

  @IsDate()
  @IsNotEmpty()
  expiration_date: Date;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterUserDto)
  assigned_users: FilterUserDto[];

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}

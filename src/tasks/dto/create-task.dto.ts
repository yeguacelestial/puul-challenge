import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/models/user.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  estimated_hours: number;

  @IsDateString()
  @IsNotEmpty()
  expiration_date: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  @IsOptional()
  assigned_users: User[];

  @IsNumber()
  cost: number;
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() filter?: Partial<User>): Promise<User[]> {
    return this.usersService.findAll(filter);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() user: CreateUserDto): Promise<User> {
    const { email } = user;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('user already created');
    }

    const createdUser = await this.usersService.create(user);
    return createdUser;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<any> {
    await this.usersService.update(id, user);
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    await this.usersService.delete(id);
    return { message: 'user deleted succesffuly' };
  }
}

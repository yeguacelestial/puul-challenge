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
import { TasksService } from './tasks.service';
import { Task } from './models/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from 'src/users/models/user.entity';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Query() filter?: Partial<User>): Promise<Task[]> {
    return this.tasksService.findAll(filter);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() task: CreateTaskDto): Promise<Task> {
    const { title } = task;

    const existingTask = await this.tasksService.findOneByTitle(title);
    if (existingTask) {
      throw new BadRequestException('task already exist');
    }

    const createdTask = await this.tasksService.create(task);
    return createdTask;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() task: Task): Promise<any> {
    await this.tasksService.update(id, task);
    return {
      message: 'Task updated successfully',
      task: await this.tasksService.findOne(id),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const task = await this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException('Task does not exist!');
    }

    await this.tasksService.delete(id);
    return { message: 'task deleted succesffuly' };
  }
}

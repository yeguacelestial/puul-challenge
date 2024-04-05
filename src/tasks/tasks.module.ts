import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from 'src/users/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}

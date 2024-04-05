import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newUser = this.taskRepository.create(task);
    return this.taskRepository.save(newUser);
  }

  async update(id: number, task: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, task);
    return this.taskRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

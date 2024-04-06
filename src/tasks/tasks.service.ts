import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './models/task.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(filter?: Partial<Task>): Promise<Task[]> {
    if (filter) {
      return this.taskRepository.find({
        where: filter,
        order: {
          created_at: {
            direction: 'DESC',
          },
        },
      });
    }
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async findOneByTitle(title: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { title } });
  }

  async create(task: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return this.taskRepository.save(newTask);
  }

  async update(id: number, updatedTask: Partial<Task>): Promise<Task> {
    let task = await this.taskRepository.findOne({
      where: { id },
      relations: ['assigned_users'],
    });

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    // Task is marked as finished
    if (updatedTask.status == 'finished') {
      if (task.status == 'finished') {
        throw new BadRequestException(`Task was already finished.`);
      }

      // Compute number of tasks and costs value
      this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          finished_tasks: () => '"finished_tasks" + 1',
          total_finished_tasks_cost: () =>
            `"total_finished_tasks_cost" + ${task.cost}`,
        })
        .whereInIds(task.assigned_users.map((user) => user.id))
        .execute();
    }

    // Assign users to the task
    if (updatedTask.assigned_users) {
      const assignedUserIds = updatedTask.assigned_users;
      const assignedUsers = await this.userRepository.findBy({
        id: In(assignedUserIds),
      });
      task.assigned_users = assignedUsers;
    }

    task = this.taskRepository.merge(task, updatedTask);

    task = await this.taskRepository.save(task);

    return task;
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  getAllTasks(user: User): Promise<Task[]> {
    return this.tasksRepository.find({ user });
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const result = await this.tasksRepository.findOne({ id, user });

    if (!result) {
      throw new NotFoundException({
        status: 'error',
        message: 'Invalid task ID',
      });
    }

    return result;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const result = await this.tasksRepository.update(
      { id, user },
      updateTaskDto,
    );

    if (!result.affected) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid task ID',
      });
    }

    return await this.tasksRepository.findOne(id);
  }

  async deleteTask(id: number, user: User): Promise<DeleteResponseDto> {
    const result = await this.tasksRepository.delete({ id, user });

    if (!result.affected) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid task ID',
      });
    }

    return {
      status: 'success',
      message: `Successfully deleted task #${id}`,
    };
  }
}

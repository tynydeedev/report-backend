import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id): Promise<Task> {
    const result = await this.tasksRepository.findOne(id);

    if (!result) {
      throw new NotFoundException({
        status: 'error',
        message: 'Invalid task ID',
      });
    }

    return result;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const result = await this.tasksRepository.update(id, updateTaskDto);

    if (!result.affected) {
      throw new BadRequestException({
        status: 'error',
        message: 'Invalid task ID',
      });
    }

    return await this.tasksRepository.findOne(id);
  }

  async deleteTask(id: number): Promise<DeleteResponseDto> {
    const result = await this.tasksRepository.delete(id);

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

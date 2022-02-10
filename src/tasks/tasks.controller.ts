import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/users.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteResponseDto } from './dto/delete-response.dto';
import { TaskParams } from './dto/task-params.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TaskService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.getAllTasks(user);
  }

  @Get(':id')
  getTaskById(
    @GetUser() user: User,
    @Param() { id }: TaskParams,
  ): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch(':id')
  updateTask(
    @GetUser() user: User,
    @Param() { id }: TaskParams,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto, user);
  }

  @Delete(':id')
  deleteTask(
    @GetUser() user: User,
    @Param() { id }: TaskParams,
  ): Promise<DeleteResponseDto> {
    return this.taskService.deleteTask(id, user);
  }
}

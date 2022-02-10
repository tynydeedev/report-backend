import { User } from 'src/users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User) {
    const newTask = this.create({ ...createTaskDto, user });

    return await this.save(newTask, {});
  }
}

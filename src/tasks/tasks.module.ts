import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

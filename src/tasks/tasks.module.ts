import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

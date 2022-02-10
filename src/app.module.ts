import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './config/envSchema';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: envSchema,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}

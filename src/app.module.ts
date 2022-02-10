import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './config/envSchema';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
    TaskModule,
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: envSchema,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    DatabaseModule,
  ],
})
export class AppModule {}

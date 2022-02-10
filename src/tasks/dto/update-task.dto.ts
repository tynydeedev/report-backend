import { IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  url?: string;

  @IsOptional()
  hashtags?: string;
}

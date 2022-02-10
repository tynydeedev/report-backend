import { IsNumberString } from 'class-validator';

export class TaskParams {
  @IsNumberString()
  id: number;
}

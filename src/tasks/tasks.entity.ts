import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  hashtags: string;

  @Column({ nullable: true })
  url: string;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User;
}

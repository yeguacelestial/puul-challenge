import { User } from 'src/users/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  estimated_hours: number;

  @Column()
  expiration_date: Date;

  @Column({ default: 'active' })
  status: string;

  @ManyToMany(() => User)
  @JoinTable()
  assigned_users: User[];

  @Column({ default: 0 })
  cost: number;
}

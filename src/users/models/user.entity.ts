import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'member' })
  role: string;

  @Column({ default: 0 })
  finished_tasks: number;

  @Column({ default: 0 })
  total_finished_tasks_cost: number;
}

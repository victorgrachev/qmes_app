import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/user/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  externalId: string;

  @ManyToOne(() => User, (user) => user.createdChats)
  creator: User;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}

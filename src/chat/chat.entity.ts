import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/user/user.entity';
import { Message } from '@/message/message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  externalId: string;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @ManyToMany(() => Message)
  @JoinTable()
  messages: Message[];
}

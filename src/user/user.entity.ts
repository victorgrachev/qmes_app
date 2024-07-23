import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chat } from '@/chat/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @OneToMany(() => Chat, (chat) => chat.creator)
  createdChats: Chat[];
}

import { UserEntity } from '../../users/entities/user.entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

/**
 * Event entity that represents a scheduled event by a user.
 */
@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

@Column({ type: 'uuid', name: '_id', unique: true, default: () => 'uuid_generate_v4()' })
_id: string;

  /**
   * Title or short description of the event.
   */
  @Column()
  event_name: string;
  /**
   * Scheduled date and time of the event.
   */
  @Column({type: 'timestamptz', name: 'execute_at'})
  executeAt: Date;

   /**
   * Scheduled date and time of the event.
   */
  @Column({type:'timestamptz', name: 'executed_at', nullable: true})
  executedAt?: Date;

  @Column({type: 'enum', enum: ['pending', 'executed'], default: 'pending'})
  status: 'pending' | 'executed';
  /**
   * Foreign key to associate event with a user.
   */
  @ManyToOne(() => UserEntity, (user) => user.events)
  user: UserEntity;
}

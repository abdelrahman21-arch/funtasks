import { EventEntity } from "../../../events/entities/events.entities";
import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";

/**
 * User entity representing the users table in the database.
 */
@Entity()
export class UserEntity {
     /**
   * Auto-generated unique user ID.
   */
  @PrimaryGeneratedColumn()
  id: number;
  
  /**
   * Unique id for the user, generated as a UUID.
   */
   @Column({ type: 'uuid', unique: true})
 @Generated('uuid')
 _id: string;

  /**
   * User's email (must be unique).
   */
 @Column( {type: 'varchar', length: 255, unique: true})
email: string;

 /**
   * Hashed password.
   */
 @Column({ type: 'varchar', length: 255 })
password: string;

/**
 * Start Of Relations
 */
@OneToMany(() => EventEntity, (event) => event.user)
events: Event[];

}

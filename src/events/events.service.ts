import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../users/entities/user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventResponseDto } from './dtos/events-response.dto';
import { EventEntity } from './entities/events.entities';
/**
 * Service handling event creation and retrieval logic.
 */
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  /**
   * Creates and saves a new event for a given user.
   * @param dto - Details of the event to create.
   * @returns Created event.
   */
  async createEvent(dto: CreateEventDto): Promise<EventResponseDto> {
    const user = await this.userRepo.findOne({ where: { _id: dto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    const event = this.eventRepo.create({
      event_name: dto.event_name,
      executeAt: dto.execute_at,
      user,
    });

    return plainToInstance(EventResponseDto, await this.eventRepo.save(event), {
      excludeExtraneousValues: true,});    
  }

}

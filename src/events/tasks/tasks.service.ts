import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { EventEntity } from '../entities/events.entities';
/**
 * Scheduled task service to update event statuses.
 */
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,
  ) {}

  /**
   * Runs every minute and updates events that have passed `execute_at` time.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleEventStatusUpdate() {
    const now = new Date();
    const dueEvents = await this.eventRepo.find({
      where: {
        status: 'pending', // or your default status
        executeAt: LessThanOrEqual(now),
      },
    });

    if (dueEvents.length > 0) {
      await Promise.all(
        dueEvents.map(event => {
          event.status = 'executed';
          event.executedAt = new Date(); // Set executedAt to current time
          return this.eventRepo.save(event);
        }),
      );
      this.logger.log(`Marked ${dueEvents.length} event(s) as EXECUTED.`);
    }
  }
}

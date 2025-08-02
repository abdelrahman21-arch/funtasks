import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity/user.entity';
import { EventEntity } from './entities/events.entities';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EventEntity])],
  providers: [JwtService, EventsService, TasksService ],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}

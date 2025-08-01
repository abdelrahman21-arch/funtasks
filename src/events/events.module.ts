import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsEntity } from './entities/events.entity';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EventsEntity])],
  providers: [JwtService, EventsService ],
  controllers: [EventsController],
  exports: [EventsService],
})
export class EventsModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EventEntity } from '../events/entities/events.entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EventEntity])],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from 'src/lib/modules/database.module';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    EventsModule,
    ScheduleModule.forRoot()
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}

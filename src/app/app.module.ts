import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from 'src/lib/modules/database.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}

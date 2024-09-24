import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigurationModule } from './database/database-configuration.module';

@Module({
  imports: [AuthModule, DatabaseConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

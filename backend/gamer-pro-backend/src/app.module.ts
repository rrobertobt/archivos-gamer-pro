import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigurationModule } from './database/database-configuration.module';
import { SalesModule } from './sales/sales.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [AuthModule, DatabaseConfigurationModule, SalesModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

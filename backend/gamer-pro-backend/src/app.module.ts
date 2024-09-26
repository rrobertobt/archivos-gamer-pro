import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigurationModule } from './database/database-configuration.module';
import { SalesModule } from './sales/sales.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, DatabaseConfigurationModule, SalesModule, CustomersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

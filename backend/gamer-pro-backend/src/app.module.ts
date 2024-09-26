import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigurationModule } from './database/database-configuration.module';
import { SalesModule } from './sales/sales.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [AuthModule, DatabaseConfigurationModule, SalesModule, CustomersModule, ProductsModule, InventoryModule, WarehouseModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

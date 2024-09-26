import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { DatabaseTransactionModule } from 'src/database/transaction/database-transaction.module';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
  imports: [DatabaseTransactionModule],
})
export class WarehouseModule {}

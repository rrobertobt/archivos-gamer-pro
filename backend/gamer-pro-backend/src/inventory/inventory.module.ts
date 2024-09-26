import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { DatabaseTransactionModule } from 'src/database/transaction/database-transaction.module';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [DatabaseTransactionModule],
})
export class InventoryModule {}

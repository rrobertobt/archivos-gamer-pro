import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { DatabaseTransactionModule } from 'src/database/transaction/database-transaction.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [DatabaseTransactionModule],
})
export class SalesModule {}

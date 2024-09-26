import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DatabaseTransactionModule } from 'src/database/transaction/database-transaction.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [DatabaseTransactionModule],
})
export class CustomersModule {}

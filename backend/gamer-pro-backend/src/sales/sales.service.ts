import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { BaseService } from 'src/core/base-service';
import { SaleModel } from 'src/database/models/SaleModel';
import { ModelClass } from 'objection';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { SaleDetailModel } from 'src/database/models/SaleDetailModel';

@Injectable()
export class SalesService extends BaseService {
  constructor(
    @Inject(SaleModel.name)
    private readonly saleModel: ModelClass<SaleModel>,
    @Inject(SaleDetailModel.name)
    private readonly saleDetailModel: ModelClass<SaleDetailModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(SalesService.name);
  }
  async create(createSaleDto: CreateSaleDto) {
    const result = await this.dbTrxService.databaseTransaction(async (trx) => {
      const { sale_details, ...saleData } = createSaleDto;
      console.log('createSaleDto', saleData.branch_id);
      const createdSale = await this.saleModel.query(trx).insert(saleData);
      const saleDetails = sale_details.map((detail) => ({
        ...detail,
        sale_id: createdSale.id,
      }));
      await this.saleDetailModel.query(trx).insert(saleDetails);
    }, this.logger);
    return result;
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}

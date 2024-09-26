import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { BaseService } from 'src/core/base-service';
import { ProductModel } from 'src/database/models/ProductModel';
import { Model, ModelClass } from 'objection';
import knex from 'knex';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';

@Injectable()
export class InventoryService extends BaseService {
  constructor(
    @Inject(ProductModel.name)
    private readonly productModel: ModelClass<ProductModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(InventoryService.name);
  }
  create(createInventoryDto: CreateInventoryDto) {
    return 'This action adds a new inventory';
  }

  async findAll(branchId: number, productName: string) {
    return (
      (await this.productModel
        .query()
        .where((builder) => {
          if (productName) {
            builder.where(
              'inventory.products.name',
              'ilike',
              `%${this.normalizeString(productName)}%`,
            );
          }
        })
        .withGraphJoined('branches')
        .withGraphJoined('stock')
        .modifyGraph('branches', (builder) => {
          builder.where('inventory.branches.id', branchId);
        })
        .modifyGraph('stock', (builder) => {
          builder.where('inventory.stocks.branch_id', branchId);
        })
        .orderBy('id', 'desc')) as ProductModel[]
    ).filter((product) => product.branches.length > 0);
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  async update(updateInventoryDto: UpdateInventoryDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const knex = this.productModel.knex();
      await knex
        .raw('call inventory.transfer_stock(?, ?, ?, ?)', [
          updateInventoryDto.branch_id,
          updateInventoryDto.product_id,
          updateInventoryDto.stock_to_move,
          updateInventoryDto.new_store_aisle,
        ])
        .transacting(trx);
      return this.productModel
        .query(trx)
        .findById(updateInventoryDto.product_id)
        .withGraphFetched('stock');
    });
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}

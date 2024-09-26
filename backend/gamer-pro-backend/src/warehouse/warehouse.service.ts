import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { BaseService } from 'src/core/base-service';
import { ProductModel } from 'src/database/models/ProductModel';
import { ModelClass } from 'objection';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { StockModel } from 'src/database/models/StockModel';

@Injectable()
export class WarehouseService extends BaseService {
  constructor(
    @Inject(StockModel.name)
    private readonly stockModel: ModelClass<StockModel>,
    @Inject(ProductModel.name)
    private readonly productModel: ModelClass<ProductModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(WarehouseService.name);
  }
  async create(createWarehouseDto: CreateWarehouseDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const data = {
        name: createWarehouseDto.name,
        code: +createWarehouseDto.code,
        price: +createWarehouseDto.price,
        category_id: +createWarehouseDto.category_id,
      };
      const productItem = await this.productModel.query(trx).insert(data);

      const stockItem = await this.stockModel.query(trx).insert({
        product_id: productItem.id,
        branch_id: createWarehouseDto.branch_id,
        warehouse_aisle: createWarehouseDto.warehouse_aisle,
        warehouse_stock: createWarehouseDto.warehouse_stock,
        store_stock: 0,
      });

      return stockItem;
    }, this.logger);
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
    return `This action returns a #${id} warehouse`;
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const productItem = await this.productModel
        .query(trx)
        .findById(id)
        .withGraphJoined('stock')
        .withGraphJoined('branches');

      if (!productItem) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      const stockItemBefore = await this.stockModel.query(trx).findOne({
        product_id: id,
        branch_id: updateWarehouseDto.branch_id,
      });

      const stockItem = await this.stockModel
        .query(trx)
        .update({
          warehouse_aisle: updateWarehouseDto.new_warehouse_aisle,
          warehouse_stock:
            +stockItemBefore.warehouse_stock +
            +updateWarehouseDto.warehouse_stock,
        })
        .where('product_id', id)
        .where('branch_id', updateWarehouseDto.branch_id);

      return stockItem;
    }, this.logger);
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}

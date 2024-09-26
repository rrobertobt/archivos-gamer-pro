import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, QueryBuilder } from 'objection';
import { Model } from 'objection';
import { ProductQueryDto } from './products.controller';
import { BaseService } from 'src/core/base-service';
import { ProductModel } from 'src/database/models/ProductModel';
import { StockModel } from 'src/database/models/StockModel';

@Injectable()
export class ProductsService extends BaseService {
  constructor(
    @Inject(ProductModel.name)
    private readonly productModel: ModelClass<ProductModel>,
    @Inject(StockModel.name)
    private readonly stockModel: ModelClass<StockModel>,
  ) {
    super(ProductsService.name);
  }

  async findAll(queryDto: ProductQueryDto) {
    const prod = await this.stockModel
      .query()
      .joinRelated('product')
      .select('product.*', 'inventory.stocks.store_stock')
      .where('inventory.stocks.branch_id', queryDto.branch_id)
      .where((builder) => this.queryFilters(queryDto, builder))
      .orderBy('product.id', 'asc');
    return prod;
  }

  async findOne(id: number) {
    return await this.productModel.query().findById(id);
  }

  queryFilters(
    queryDto: ProductQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (queryDto.name) {
      builder.andWhere(
        'name',
        'ilike',
        `%${this.normalizeString(queryDto.name)}%`,
      );
    }
    if (queryDto.code) {
      builder.andWhere(
        'code',
        'ilike',
        `%${this.normalizeString(queryDto.code)}%`,
      );
    }
    if (queryDto.category_id) {
      builder.andWhere('category_id', queryDto.category_id);
    }

    return builder;
  }
}

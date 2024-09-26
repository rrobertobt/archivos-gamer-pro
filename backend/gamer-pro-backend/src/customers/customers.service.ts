import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerModel } from 'src/database/models/CustomerModel';
import { Model, ModelClass, QueryBuilder } from 'objection';
import { DatabaseTransactionService } from 'src/database/transaction/database-transaction.service';
import { BaseService } from 'src/core/base-service';
import { CustomerQueryDto } from './dto/customer-query.dto';

@Injectable()
export class CustomersService extends BaseService {
  constructor(
    @Inject(CustomerModel.name)
    private customerModel: ModelClass<CustomerModel>,
    private readonly dbTrxService: DatabaseTransactionService,
  ) {
    super(CustomersService.name);
  }

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const createdCustomer = await this.customerModel
        .query(trx)
        .insert(createCustomerDto);
      return createdCustomer;
    }, this.logger);
  }

  async findAll(queryDto: CustomerQueryDto) {
    // if (queryDto.nit) {
    //   return await this.customerModel.query().findOne({ nit: queryDto.nit });
    // }

    return await this.customerModel
      .query()
      .select('*')
      .where((builder) => this.queryFilters(queryDto, builder))
      .orderBy('id', 'desc');
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.dbTrxService.databaseTransaction(async (trx) => {
      const updatedCustomer = await this.customerModel
        .query(trx)
        .patchAndFetchById(id, updateCustomerDto);
      return updatedCustomer;
    }, this.logger);
  }

  queryFilters(
    queryDto: CustomerQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (queryDto.name) {
      builder.andWhere(
        'name',
        'ilike',
        `%${this.normalizeString(queryDto.name)}%`,
      );
    }
    if (queryDto.nit) {
      // nit is a number
      builder.andWhereRaw(`nit::TEXT ilike '%${queryDto.nit}%'`);
    }

    return builder;
  }
}

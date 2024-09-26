import * as Knex from 'knex';
import { Model } from 'objection';
import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RoleModel } from './models/RoleModel';
import { EmployeeModel } from './models/EmployeeModel';
import { BranchModel } from './models/BranchModel';
import { CategoryModel } from './models/CategoryModel';
import { CreditPointsCardModel } from './models/CreditPointsCardModel';
import { CustomerModel } from './models/CustomerModel';
import { ProductModel } from './models/ProductModel';
import { SaleDetailModel } from './models/SaleDetailModel';
import { SaleModel } from './models/SaleModel';

dotenv.config();

// Insert database models here
const models = [
  RoleModel,
  EmployeeModel,
  BranchModel,
  CategoryModel,
  CreditPointsCardModel,
  CustomerModel,
  ProductModel,
  SaleModel,
  SaleDetailModel,
];

const modelProviders = models.map((model) => {
  return {
    provide: model?.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex.knex({
        client: 'pg',
        connection: {
          host: 'localhost',
          port: 5432,
          user: 'robertob',
          password: process.env.DB_PASS,
          database: 'gamer_pro_xela_db',
          debug: process.env.NODE_ENV === 'development',
        },
      });
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseConfigurationModule {}

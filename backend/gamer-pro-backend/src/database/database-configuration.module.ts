import * as Knex from 'knex';
import { Model } from 'objection';
import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { RoleModel } from './models/RoleModel';
import { EmployeeModel } from './models/EmployeeModel';

dotenv.config();

// Insert database models here
const models = [
  RoleModel,
  EmployeeModel
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

import { Model } from 'objection';
import { EmployeeModel } from './EmployeeModel';
import { ProductModel } from './ProductModel';
import { StockModel } from './StockModel';

export class BranchModel extends Model {
  static tableName = 'inventory.branches';

  id: number;
  name: string;
  address: string;

  static get relationMappings() {
    return {
      employees: {
        relation: Model.HasManyRelation,
        modelClass: EmployeeModel,
        join: {
          from: 'inventory.branches.id',
          to: 'employees.employees.branch_id',
        },
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: 'inventory.branches.id',
          through: {
            from: 'inventory.stocks.branch_id',
            to: 'inventory.stocks.product_id',
          },
          to: 'inventory.products.id',
        },
      },
      stock: {
        relation: Model.HasManyRelation,
        modelClass: StockModel,
        join: {
          from: 'inventory.branches.id',
          to: 'inventory.stocks.branch_id',
        },
      },
    };
  }
}

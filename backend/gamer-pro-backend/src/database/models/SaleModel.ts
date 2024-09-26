import { Model } from 'objection';
import { BranchModel } from './BranchModel';
import { CustomerModel } from './CustomerModel';
import { EmployeeModel } from './EmployeeModel';
import { SaleDetailModel } from './SaleDetailModel';

export class SaleModel extends Model {
  static tableName = 'sales.sales';

  id: number;
  date_sale: Date;
  total: number;
  total_without_discount: number;

  branch_id: number;
  customer_id: number;
  employee_id: number;

  static get relationMappings() {
    return {
      branch: {
        relation: Model.BelongsToOneRelation,
        modelClass: BranchModel,
        join: {
          from: 'sales.sales.branch_id',
          to: 'inventory.branches.id',
        },
      },
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: CustomerModel,
        join: {
          from: 'sales.sales.customer_id',
          to: 'customers.customers.id',
        },
      },
      employee: {
        relation: Model.BelongsToOneRelation,
        modelClass: EmployeeModel,
        join: {
          from: 'sales.sales.employee_id',
          to: 'employees.employees.id',
        },
      },
      sale_details: {
        relation: Model.HasManyRelation,
        modelClass: SaleDetailModel,
        join: {
          from: 'sales.sales.id',
          to: 'sales.sales_details.sale_id',
        },
      },
    };
  }
}

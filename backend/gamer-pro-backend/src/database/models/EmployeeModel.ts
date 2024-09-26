import { Model } from 'objection';
import { RoleModel } from './RoleModel';
import { BranchModel } from './BranchModel';

export class EmployeeModel extends Model {
  static tableName = 'employees.employees';

  id: number;
  name: string;
  encrypted_password: string;
  username: string;
  assigned_checkout: number;

  role_id: number;
  branch_id: number;

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: RoleModel,
        join: {
          from: 'employees.employees.role_id',
          to: 'employees.roles.id',
        },
      },
      branch: {
        relation: Model.BelongsToOneRelation,
        modelClass: BranchModel,
        join: {
          from: 'employees.employees.branch_id',
          to: 'inventory.branches.id',
        },
      },
    };
  }
}

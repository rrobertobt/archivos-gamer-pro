import { Model } from 'objection';
import { EmployeeModel } from './EmployeeModel';

export class RoleModel extends Model {
  static tableName = 'employees.roles';

  id: number;
  name: string;
  description: string;

  static get relationMappings() {
    return {
      employees: {
        relation: Model.HasManyRelation,
        modelClass: EmployeeModel,
        join: {
          from: 'employees.roles.id',
          to: 'employees.employees.role_id',
        },
      },
    };
  }
}

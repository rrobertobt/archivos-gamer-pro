import { Model } from 'objection';
import { CreditPointsCardModel } from './CreditPointsCardModel';

export class CustomerModel extends Model {
  static tableName = 'customers.customers';

  id: number;
  nit: number;
  name: string;
  phone: string;

  static get relationMappings() {
    return {
      creditPointsCard: {
        relation: Model.HasManyRelation,
        modelClass: CreditPointsCardModel,
        join: {
          from: 'customers.customers.id',
          to: 'customers.credit_points_cards.customer_id',
        },
      },
    };
  }
}

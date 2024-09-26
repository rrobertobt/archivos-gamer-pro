import { Model } from 'objection';
import { CustomerModel } from './CustomerModel';

export enum creditPointsType {
  COMMON = 'common',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond',
}

export class CreditPointsCardModel extends Model {
  static tableName = 'customers.credit_points_cards';

  id: number;
  type: creditPointsType;
  points: number;
  date_issue: Date;

  static get relationMappings() {
    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: CustomerModel,
        join: {
          from: 'customers.credit_points_cards.customer_id',
          to: 'customers.customers.id',
        },
      },
    };
  }
}

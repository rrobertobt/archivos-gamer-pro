import { Model } from 'objection';
import { CategoryModel } from './CategoryModel';
import { BranchModel } from './BranchModel';

export class ProductModel extends Model {
  static tableName = 'inventory.products';

  id: number;
  name: string;
  description: string;
  price: number;

  category_id: number;

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryModel,
        join: {
          from: 'inventory.products.category_id',
          to: 'inventory.categories.id',
        },
      },
      branches: {
        relation: Model.ManyToManyRelation,
        modelClass: BranchModel,
        join: {
          from: 'inventory.products.id',
          through: {
            from: 'inventory.stocks.product_id',
            to: 'inventory.stocks.branch_id',
          },
          to: 'inventory.branches.id',
        },
      },
    };
  }
}

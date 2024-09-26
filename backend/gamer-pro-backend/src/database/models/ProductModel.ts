import { Model } from 'objection';
import { CategoryModel } from './CategoryModel';
import { BranchModel } from './BranchModel';
import { StockModel } from './StockModel';

export class ProductModel extends Model {
  static tableName = 'inventory.products';

  id: number;
  name: string;
  description: string;
  price: number;

  category_id: number;

  branches: BranchModel[];

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
      stock: {
        relation: Model.HasManyRelation,
        modelClass: StockModel,
        join: {
          from: 'inventory.products.id',
          to: 'inventory.stocks.product_id',
        },
      },
    };
  }
}

import { Model } from 'objection';
import { ProductModel } from './ProductModel';
import { BranchModel } from './BranchModel';

export class StockModel extends Model {
  static tableName = 'inventory.stocks';

  id: number;
  warehouse_stock: number;
  store_stock: number;
  branch_id: number;
  product_id: number;

  warehouse_aisle: string;
  store_aisle: string;

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: 'inventory.stocks.product_id',
          to: 'inventory.products.id',
        },
      },
      branch: {
        relation: Model.BelongsToOneRelation,
        modelClass: BranchModel,
        join: {
          from: 'inventory.stocks.branch_id',
          to: 'inventory.branches.id',
        },
      },
    };
  }
}

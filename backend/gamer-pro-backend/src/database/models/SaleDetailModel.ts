import { Model } from 'objection';
import { SaleModel } from './SaleModel';
import { ProductModel } from './ProductModel';

export class SaleDetailModel extends Model {
  static tableName = 'sales.sales_details';

  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;

  static get relationMappings() {
    return {
      sale: {
        relation: Model.BelongsToOneRelation,
        modelClass: SaleModel,
        join: {
          from: 'sales.sales_details.sale_id',
          to: 'sales.sales.id',
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: 'sales.sales_details.product_id',
          to: 'inventory.products.id',
        },
      },
    };
  }
}

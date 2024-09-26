import { Model } from 'objection';
import { ProductModel } from './ProductModel';

export class CategoryModel extends Model {
  static tableName = 'inventory.categories';

  id: number;
  name: string;
  description: string;

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: ProductModel,
        join: {
          from: 'inventory.categories.id',
          to: 'inventory.products.category_id',
        },
      },
    };
  }
}

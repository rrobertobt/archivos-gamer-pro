import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  product_id: number;
  stock_to_move: number;
  branch_id: number;
  new_store_aisle: string;
}

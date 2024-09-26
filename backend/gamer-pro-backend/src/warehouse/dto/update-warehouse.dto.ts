import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';

export class UpdateWarehouseDto {
  warehouse_stock: number;
  branch_id: number;
  new_warehouse_aisle: string;
}

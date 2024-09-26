class SaleDetailDto {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export class CreateSaleDto {
  branch_id: number;
  customer_id?: number;
  employee_id: number;
  sale_details: SaleDetailDto[];
}

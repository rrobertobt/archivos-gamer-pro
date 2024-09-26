import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RoleGuard } from 'src/core/decorators/roles.guard';

export class ProductQueryDto {
  name: string;
  code: string;
  category_id: number;
  branch_id: number;
}

@UseGuards(RoleGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll(@Query() queryDto: ProductQueryDto) {
    return this.productsService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}

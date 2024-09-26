import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RoleGuard } from 'src/core/decorators/roles.guard';
import { Role } from 'src/core/decorators/role.decorator';

@UseGuards(RoleGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Role('inventory')
  @Get()
  findAll(@Query() queryDto: { branch_id: string; product_name: string }) {
    return this.inventoryService.findAll(
      +queryDto.branch_id,
      queryDto.product_name,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch()
  @Role('inventory')
  update(@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Role } from 'src/core/decorators/role.decorator';
import { RoleGuard } from 'src/core/decorators/roles.guard';

@UseGuards(RoleGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @Role('cashier')
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @Role('cashier')
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @Role('cashier')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}

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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RoleGuard } from 'src/core/decorators/roles.guard';
import { Role } from 'src/core/decorators/role.decorator';
import { CustomerQueryDto } from './dto/customer-query.dto';

@UseGuards(RoleGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Role('cashier')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Role('cashier')
  findAll(@Query() queryDto: CustomerQueryDto) {
    return this.customersService.findAll(queryDto);
  }

  @Get(':nit')
  findOne(@Param('nit') nit: string) {
    return this.customersService.findOne(+nit);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.customersService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('paid')
  @ApiBearerAuth()
  findAllPaid() {
    return this.ordersService.findAllPaid();
  }

  @Get('un-paid')
  @ApiBearerAuth()
  findAllUnPaid() {
    return this.ordersService.findUnPaid();
  }

  @Get('site/:siteId')
  @ApiBearerAuth()
  findSiteOrders(@Param('siteId') siteId: string) {
    return this.ordersService.findSiteOrders(+siteId);
  }

  @Get('site/:siteId/active')
  @ApiBearerAuth()
  findSiteActiveOrders(@Param('siteId') siteId: string) {
    return this.ordersService.findSiteActive(+siteId);
  }

  @Post('new-order')
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Put(':id')
  updatePayment(@Param('id') id: string) {
    return this.ordersService.updatePaymentStatus(+id);
  }

  @Get('rego/:rego')
  @ApiBearerAuth()
  validateByRego(@Param('rego') rego: string) {
    return this.ordersService.findActive(rego);
  }

  @Get()
  findByRego(@Query('rego') rego: string) {
    return this.ordersService.findByRego(rego);
  }

  @Post(':id')
  updateOrder(
    @Param('id') id: string,
    @Body() { rego, paidHours, payment, validateTime }: UpdateOrderDto,
  ) {
    return this.ordersService.update(+id, {
      rego,
      paidHours,
      payment,
      validateTime,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Delete(':unpaid')
  @ApiBearerAuth()
  removeAllUnpaid() {
    return this.ordersService.removeUnpaid();
  }
}

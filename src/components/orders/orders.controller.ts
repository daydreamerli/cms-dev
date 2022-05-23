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

  @Get('site')
  @ApiBearerAuth()
  findSiteOrders(@Query('siteId') siteId: number) {
    return this.ordersService.findSiteOrders(siteId);
  }

  @Get(':siteId/active')
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

  @Get(':siteId/:rego')
  @ApiBearerAuth()
  validateByRego(@Param('rego') rego: string, @Param('siteId') siteId: number) {
    console.log('rego api got: ', rego);
    return this.ordersService.findActive(rego, siteId);
  }

  @Get('rego/:rego')
  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @RolesAllowed(Role.ADMIN, Role.MANAGER)
  findOrdersByRego(@Param('rego') rego: string) {
    console.log(rego);
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

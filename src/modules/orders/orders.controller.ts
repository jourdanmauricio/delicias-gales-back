import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderProductDto } from './order.dto';
import { UUID } from 'crypto';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/models/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { PayDto } from './pay.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.ADMIN, Role.SELLER, Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  findAll(@Req() request) {
    const userId = request.user.id;
    return this.ordersService.findAll(userId);
  }

  @ApiBearerAuth()
  @Post()
  createOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.createOrder(userId, products);
  }

  @ApiBearerAuth()
  @Post('/seller-admin')
  @Roles(Role.ADMIN, Role.SELLER)
  @UseGuards(AuthGuard, RolesGuard)
  createOrderSeller(@Req() request, @Body() order: CreateOrderDto) {
    const sellerId = request.user.id;
    const { userId, products } = order;
    return this.ordersService.createOrderSeller(sellerId, userId, products);
  }

  @ApiBearerAuth()
  @Post('/pay')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard, RolesGuard)
  createPay(@Body() pay: PayDto) {
    return this.ordersService.createPay(pay);
  }

  @ApiBearerAuth()
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.ordersService.findById(id);
  }

  @ApiBearerAuth()
  @Roles(Role.ADMIN, Role.SELLER)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  updateOrder(
    @Req() request,
    @Param('id', ParseUUIDPipe) orderId: UUID,
    @Body() changes: UpdateOrderProductDto,
  ) {
    const userId = request.user.id;
    return this.ordersService.updateOrder(userId, orderId, changes);
  }
}

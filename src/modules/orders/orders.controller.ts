import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Controller } from '@nestjs/common';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
}

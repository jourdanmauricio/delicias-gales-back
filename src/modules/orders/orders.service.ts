import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly ordersDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createOrder(
    userId: string,
    products: { id: string; quantity: number }[],
  ) {
    let total = 0;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const order = new Order();
    order.user = user;
    order.date = new Date();

    const newOrder = await this.ordersRepository.save(order);

    const orderDetailsArray = await Promise.all(
      products.map(async (elem) => {
        const product = await this.productsRepository.findOneBy({
          id: elem.id,
          stock: MoreThan(0),
        });
        if (!product) throw new NotFoundException('Product not found');
        if (product.stock < elem.quantity)
          throw new NotFoundException(
            'Product not available in sufficient quantity',
          );

        total += Number(product.originalPrice) * elem.quantity;

        await this.productsRepository.update(
          { id: product.id },
          { stock: product.stock - elem.quantity },
        );

        const orderDetail = new OrderDetail();
        orderDetail.product = product;
        orderDetail.quantity = elem.quantity;
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.subtotal = Number(
          (product.retailPrice * elem.quantity).toFixed(2),
        );
        orderDetail.discount = 0; // Asume que no hay descuento. Ajusta según sea necesario.
        orderDetail.order = newOrder;

        return orderDetail;
      }),
    );

    // Guarda todos los detalles de la orden en la base de datos
    await this.ordersDetailsRepository.save(orderDetailsArray);

    const finalOrder = await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: ['user', 'orderDetails', 'orderDetails.product'],
    });

    if (finalOrder && finalOrder.user) {
      delete finalOrder.user.password;
    }

    return finalOrder;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  public async create(createOrderDto: CreateOrderDto): Promise<Partial<Order>> {
    // add check rego logic if user payment failed in 10-30mins don't create new order

    const newOrder = this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(newOrder);
    // to-do call windcave payment api
    return {
      id: newOrder.id,
      rego: newOrder.rego,
      paidHours: newOrder.paidHours,
      payment: newOrder.payment,
      validateTime: newOrder.validateTime,
    };
  }

  public async findAll() {
    return await this.orderRepository.find({});
  }

  public async findAllPaid() {
    return await this.orderRepository.find({ where: { paymentStatus: true } });
  }

  public async findUnPaid() {
    return await this.orderRepository.find({ where: { paymentStatus: false } });
  }

  public async findSiteOrders(siteId: number) {
    return await this.orderRepository.find({
      where: { siteId: siteId, paymentStatus: true },
    });
  }

  public async findOne(id: number) {
    return await this.orderRepository.findOne(id);
  }

  public async findByTime(rego: string) {
    const timeNow = new Date();
    const today = timeNow.toDateString();
    console.log(today);
    const existingOrder = await this.orderRepository
      .createQueryBuilder('order')
      .where(`order.rego = :rego`, { rego: rego })
      .getMany();
    if (existingOrder.length === 0) {
      return new HttpException('No order found', HttpStatus.NOT_FOUND);
    }
    if (
      existingOrder[existingOrder.length - 1].createTime.toDateString() ===
        today &&
      existingOrder[existingOrder.length - 1].validateTime.toISOString() >=
        timeNow.toISOString()
    ) {
      console.log(
        existingOrder[existingOrder.length - 1].createTime.toDateString(),
      );
      console.log(
        existingOrder[existingOrder.length - 1].validateTime.toISOString(),
      );
      return existingOrder[existingOrder.length - 1];
    }
    return new HttpException('No order found', HttpStatus.NOT_FOUND);
  }

  public async findByRego(rego: string) {
    const existingOrder = await this.orderRepository.find({
      where: { rego: rego },
    });
    return existingOrder;
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, {
      rego: updateOrderDto.rego,
      paidHours: updateOrderDto.paidHours,
      payment: updateOrderDto.payment,
      validateTime: updateOrderDto.validateTime,
    });
    return `This #${id} order payment updated `;
  }

  public async updatePaymentStatus(id: number) {
    await this.orderRepository.update(id, {
      paymentStatus: true,
    });
    return `This #${id} order payment updated `;
  }

  public async remove(id: number) {
    return await this.orderRepository.delete(id);
  }

  public async removeUnpaid() {
    const unpaidOrders: Order[] = await this.orderRepository.find({
      where: { paymentStatus: false },
    });
    return await this.orderRepository.remove(unpaidOrders);
  }
}

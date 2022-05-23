import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  public async create(createOrderDto: CreateOrderDto): Promise<Partial<Order>> {
    // add check rego logic if user payment failed in 10-30mins don't create new order
    // change the process rego---> new ---> create Order
    // existing Rego ---> findActive--> return existing order
    const siteId = createOrderDto.siteId;
    const regoOrders = await this.orderRepository
      .createQueryBuilder('order')
      .where(`order.rego = :rego`, { rego: createOrderDto.rego })
      .getMany();
    if (regoOrders.length > 0) {
      const existingOrder = regoOrders.find((order) => {
        const orderDate = order.createTime.toDateString();
        const orderValidateTime = order.validateTime.toISOString();
        if (
          orderDate === new Date().toDateString() &&
          orderValidateTime >= new Date().toISOString()
        ) {
          return order;
        }
      });
      return {
        id: existingOrder?.id,
        rego: existingOrder?.rego,
        paidHours: existingOrder?.paidHours,
        payment: existingOrder?.payment,
        validateTime: existingOrder?.validateTime,
      };
    }
    console.log('service got new order data: ', createOrderDto);
    const newOrder = this.orderRepository.create(createOrderDto);
    await this.orderRepository.save(newOrder);
    // create relationship with site while create new order
    // eslint-disable-next-line prettier/prettier
        await getConnection()
      .createQueryBuilder()
      .relation(Order, 'site')
      .of(newOrder)
      .set(siteId);
    return {
      id: newOrder.id,
      rego: newOrder.rego,
      paidHours: newOrder.paidHours,
      payment: newOrder.payment,
      validateTime: newOrder.validateTime,
    };
  }

  public async findActive(rego: string, siteId: number) {
    const timeNow = new Date();
    const today = timeNow.toDateString();
    console.log(today);
    const existingOrder = await this.findBySiteRego(rego, siteId);
    console.log(existingOrder);
    if (existingOrder.length === 0) {
      return new HttpException('No order found', HttpStatus.NOT_FOUND);
    }
    if (
      existingOrder[existingOrder.length - 1].createTime.toDateString() === today &&
      existingOrder[existingOrder.length - 1].validateTime.toISOString() >= timeNow.toISOString()
    ) {
      // console.log('FindByRego ', existingOrder[existingOrder.length - 1]);
      return existingOrder[existingOrder.length - 1];
    }
    return new HttpException('No order found', HttpStatus.NOT_FOUND);
  }

  public async findSiteOrders(siteId: number) {
    console.log(siteId);
    const siteOrders = await this.orderRepository
      .createQueryBuilder('order')
      .where(`order.siteId = :siteId`, { siteId: siteId })
      .getMany();
    // if (siteOrders.length === 0) {
    //   return new HttpException('No order found', HttpStatus.NOT_FOUND);
    // }
    return siteOrders;
  }

  public async findSiteActive(siteId: number) {
    const timeNow = new Date();
    const today = timeNow.toDateString();
    // console.log(today);
    const existingOrder = await this.orderRepository
      .createQueryBuilder('order')
      .where(`order.siteId = :siteId`, { siteId: siteId })
      // .andWhere(`order.createTime.toDateString() = :today`, { today: today })
      .getMany();
    console.log(existingOrder);
    if (existingOrder.length === 0) {
      return existingOrder; // instead of return new HttpException 404;
    }
    const activeSiteOrder: Order[] = [];
    existingOrder.forEach((order) => {
      const orderDate = order.createTime.toDateString();
      // console.log(orderDate);
      const orderValidateTime = order.validateTime.toISOString();
      // console.log(orderValidateTime);
      if (orderDate === today && orderValidateTime >= timeNow.toISOString()) {
        console.log(order);
        activeSiteOrder.push(order);
      }
      // console.log(activeSiteOrder);
      // return activeSiteOrder;
    });
    return activeSiteOrder;
  }

  public async findByRego(rego: string) {
    console.log(rego);
    const existingOrder = await this.orderRepository.find({
      where: { rego: rego },
    });
    console.log(existingOrder)
    // const existingOrder = await this.orderRepository
    //   .createQueryBuilder()
    //   .where(`order.rego = :rego`, { rego: rego })
    //   // .andWhere('paymentStatus = :paymentStatus', { paymentStatus: true }) // paymentStatus is required or not
    //   .getMany();
    // console.log(existingOrder);
    return existingOrder;
  }

  public async findBySiteRego(rego: string, siteId: number) {
    console.log(rego);
    const existingOrder = await this.orderRepository
      .createQueryBuilder()
      .where(`order.rego = :rego`, { rego: rego })
      .andWhere('siteId = :siteId', { siteId })
      .andWhere('paymentStatus = :paymentStatus', { paymentStatus: true })
      .getMany();
    console.log(existingOrder);
    return existingOrder;
  }

  public async findOne(id: number) {
    return await this.orderRepository.findOne(id);
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderRepository.update(id, {
      rego: updateOrderDto.rego,
      paidHours: updateOrderDto.paidHours,
      payment: updateOrderDto.payment,
      validateTime: updateOrderDto.validateTime,
    });
    return `This #${id} Order payment updated `;
  }

  public async updatePaymentStatus(id: number) {
    await this.orderRepository.update(id, {
      paymentStatus: true,
    });
    return `This #${id} order payment updated `;
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

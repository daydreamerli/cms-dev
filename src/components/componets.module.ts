import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { SitesModule } from './sites/sites.module';
import { OffersModule } from './offers/offers.module';
import { HolidayRatesModule } from './holiday-rates/holiday-rates.module';
import { HolidaysModule } from './holidays/holidays.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    OrdersModule,
    SitesModule,
    OffersModule,
    HolidayRatesModule,
    HolidaysModule,
    OwnersModule,
  ],
})
export class ComponentsModule {}

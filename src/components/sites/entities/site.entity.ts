import { HolidayRate } from 'src/components/holiday-rates/entities/holiday-rate.entity';
import { Holiday } from 'src/components/holidays/entities/holiday.entity';
import { Offer } from 'src/components/offers/entities/offer.entity';
import { Owner } from 'src/components/owners/entities/owner.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  siteName: string;

  @Column()
  address: string;

  @ManyToOne(() => Owner, (owner) => owner.sites)
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;

  @Column()
  spotsNum: number;

  @Column()
  baseTime: number;

  @Column()
  casualRate: number;

  @Column({ nullable: true })
  dailyMax: number;

  @Column({ nullable: true })
  weekendMax: number;

  @OneToMany(() => Offer, (offer) => offer.site, { cascade: true })
  @JoinColumn()
  offers: Offer[];

  @OneToMany(() => HolidayRate, (holidayRate) => holidayRate.site)
  @JoinColumn()
  holidayRates: HolidayRate[];

  @OneToMany(() => Holiday, (holiday) => holiday.site)
  @JoinColumn()
  holidays: Holiday[];

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;
}

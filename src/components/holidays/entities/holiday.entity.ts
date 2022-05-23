import { HolidayRate } from 'src/components/holiday-rates/entities/holiday-rate.entity';
import { Site } from 'src/components/sites/entities/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  holidayName: string;

  @ManyToOne(() => HolidayRate, (holidayRate) => holidayRate.holidays)
  @JoinColumn({ name: 'holidayRateId' })
  holidayRate: HolidayRate;

  @ManyToOne(() => Site, (site) => site.holidays)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column({ type: 'date' })
  startAt: Date;

  @Column({ type: 'date', nullable: true })
  endAt: Date;
}

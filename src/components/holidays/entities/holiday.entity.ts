import { HolidayRate } from 'src/components/holiday-rates/entities/holiday-rate.entity';
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

  @Column()
  holidayRateId: number;

  @Column({ type: 'date' })
  startAt: Date;

  @Column({ type: 'date', nullable: true })
  endAt: Date;
}

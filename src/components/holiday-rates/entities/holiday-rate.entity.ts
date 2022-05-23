import { Holiday } from 'src/components/holidays/entities/holiday.entity';
import { Site } from 'src/components/sites/entities/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

@Entity()
export class HolidayRate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Site, (site) => site.offers)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @OneToMany(() => Holiday, (holidays) => holidays.holidayRate)
  @JoinColumn()
  holidays: Holiday[];

  @Column()
  rateName: string;

  @Column({ nullable: true })
  hourlyRate: number;

  @Column()
  dailyMax: number;

  @Column({ nullable: true })
  specialRate: number;

  @Column({ nullable: true })
  specialHours: number;

  @Column({ default: false })
  status: boolean; // identify if special rate is active or not
}

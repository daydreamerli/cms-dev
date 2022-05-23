import { Site } from 'src/components/sites/entities/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Site, (site) => site.offers)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  offerName: string;

  @Column()
  sequences: number; // Sequences of the offer

  @Column()
  charge: number;

  @Column()
  validateHours: number;

  @Column({ type: 'time' })
  startAt: Date;

  @Column({ type: 'time' })
  endAt: Date;

  @Column({ default: false })
  active: boolean; // Whether the offer is active or not for the site at the time period
}

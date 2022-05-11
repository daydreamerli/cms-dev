import { Site } from 'src/components/sites/entities/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Site, (site) => site.offers)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  siteId: number;

  @Column()
  rego: string;

  @Column()
  paidHours: number;

  @Column()
  payment: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column('timestamp')
  validateTime: Date;

  @Column({ default: false })
  paymentStatus: boolean;
}

import { Site } from 'src/components/sites/entities/site.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Site, (site) => site.owner)
  @JoinColumn()
  sites: Site[];

  @Column()
  ownerName: string;

  @Column()
  contactNum: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  address: string;
}

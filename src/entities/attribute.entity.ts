import {
  Column,
  CreateDateColumn,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
// import { ProductAttribute } from './productAttributes.entity';

@Entity({ name: 'attributes' })
export class Attribute {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', name: 'unit_default', length: 20, nullable: true })
  unitDefault?: string;

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'now()',
  })
  updatedAt: Date;

  // @OneToMany(() => ProductAttribute, (prodAttr) => prodAttr.attribute)
  // attributes: ProductAttribute[];
}

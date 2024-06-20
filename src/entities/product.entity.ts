import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImages } from './productImage';
import { ProductInventories } from './productInventory';
import { Brand } from './brand.entity';
import { ProductStatus } from 'src/models/productStatus.enum';
import { ProductAttribute } from './productAttributes.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cod: string;

  @Column({ type: 'varchar', length: 40, nullable: true })
  sku?: string;

  @Column({
    type: 'decimal',
    name: 'original_price',
    precision: 10,
    scale: 2,
  })
  originalPrice: number;

  @Column({
    type: 'decimal',
    name: 'wholesale_price',
    precision: 10,
    scale: 2,
  })
  wholesalePrice: number;

  @Column({
    type: 'decimal',
    name: 'retail_price',
    precision: 10,
    scale: 2,
  })
  retailPrice: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'int', name: 'min_quantity' })
  minQuantity: number;

  @Column({ type: 'int', name: 'max_quantity', nullable: true })
  maxQuantity: number;

  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

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

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  categories: Category[];

  @OneToMany(() => ProductImages, (image) => image.product)
  images: ProductImages[];

  @OneToMany(() => ProductInventories, (inventory) => inventory.product)
  inventories: ProductImages[];

  @OneToMany(() => ProductAttribute, (prodAttr) => prodAttr.attribute)
  attributes: ProductAttribute[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}

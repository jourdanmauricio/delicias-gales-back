import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import config from '../config';
import { Order } from 'src/entities/order.entity';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { ProductImages } from 'src/entities/productImage';
import { ProductInventories } from 'src/entities/productInventory';

const API_KEY = '12345678';
const API_KEY_PROD = 'PROD12345678';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUser,
          password: dbPass,
          database: dbName,
          // Migraciones -> pasamos synchronize a false, comentamos entities
          // y dropschema
          entities: [
            User,
            Category,
            Order,
            Product,
            ProductImages,
            ProductInventories,
          ],
          synchronize: true,
          autoLoadEntities: true,
          logging: ['error'],
          // logging: true,
          dropSchema: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbHost, dbPort, dbName, dbUser, dbPass } =
          configService.postgres;
        const client = new Client({
          host: dbHost,
          port: dbPort,
          database: dbName,
          user: dbUser,
          password: dbPass,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG'],
})
export class DatabseModule {}

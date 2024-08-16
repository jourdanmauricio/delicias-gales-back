import { Module } from '@nestjs/common';
import { FormulationsController } from './formulations.controller';
import { FormulationsService } from './formulations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulation } from 'src/entities/formulations.entity';
import { FormulationItem } from 'src/entities/formulationItems';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Formulation, FormulationItem, Product])],
  controllers: [FormulationsController],
  providers: [FormulationsService],
})
export class FormulationsModule {}

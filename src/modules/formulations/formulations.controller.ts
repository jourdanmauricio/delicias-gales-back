import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFormulationDto } from './formulation.dto';
import { FormulationsService } from './formulations.service';

@Controller('formulations')
export class FormulationsController {
  constructor(private readonly formulationsService: FormulationsService) {}
  @Get()
  findAll() {
    return this.formulationsService.findAll();
  }

  @Post('create')
  creatreformu(@Body() data: CreateFormulationDto) {
    return this.formulationsService.create(data);
  }
}

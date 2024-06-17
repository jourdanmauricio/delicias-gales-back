import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty({ description: 'Nombre del atributo' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Unidad de medida default' })
  @IsString()
  @IsOptional()
  readonly unitDefault: string;
}

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {}

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ description: 'Nombre comercial de la marca' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

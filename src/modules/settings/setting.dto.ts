import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateSettingDto {
  /**
   * Feature debe ser una cadena de texto no nula
   * @example socialNetworks
   */
  @ApiProperty({ description: 'Característica de la configuración' })
  @IsString()
  @IsNotEmpty()
  readonly feature: string;

  /**
   * El nombre debe ser una cadena de texto no nula
   * @example facebook
   */
  @ApiProperty({ description: 'Nombre de la característica' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /**
   * El valor debe ser una cadena de texto no nula
   * @example https://facebook.com/delicias-gales
   */
  @ApiProperty({ description: 'Valor de la característica' })
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @IsEmpty()
  @ApiHideProperty()
  order: number;
}

export class UpdateSettingDto extends PartialType(CreateSettingDto) {}

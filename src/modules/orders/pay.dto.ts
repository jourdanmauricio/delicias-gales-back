import { IsNumber, IsString } from 'class-validator';

export class PayDto {
  @IsString()
  orderId: string;

  @IsNumber()
  amount: number;
}

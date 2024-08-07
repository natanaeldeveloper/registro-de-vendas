import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { Purchase } from 'src/entities/purchase.entity';

export class CreatePurchaseProductDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  count: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Product)
  product: Product;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Purchase)
  purchase: Purchase;
}

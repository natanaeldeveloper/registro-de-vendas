import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Product } from 'src/entities/product.entity';
import { TheTotalPriceMustCorrespondToTheTotalPriceToTheProducts } from 'src/validates/the-total-price-must-correspond-to-the-total-price-to-the-products.constraint';

export class AddProductPurchasedDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  count: number;

  @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => Product)
  product: Product;

  @IsNumber()
  @Min(0)
  @TheTotalPriceMustCorrespondToTheTotalPriceToTheProducts()
  totalPrice: number;
}

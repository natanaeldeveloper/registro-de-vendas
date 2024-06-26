import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AddProductPurchasedDto } from 'src/dtos/add-product-purchase.dto';

@ValidatorConstraint({ async: false })
export class TheTotalPriceMustCorrespondToTheTotalPriceToTheProductsConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const props = args.object as AddProductPurchasedDto;
    return value === props.product.price * props.count;
  }

  defaultMessage() {
    return 'O preço total deve condizer com a quantidade de produto x preço por produto.';
  }
}

export function TheTotalPriceMustCorrespondToTheTotalPriceToTheProducts(
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator:
        TheTotalPriceMustCorrespondToTheTotalPriceToTheProductsConstraint,
    });
  };
}

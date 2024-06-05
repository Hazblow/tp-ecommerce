import { IsNumber, IsString, isString, MinLength } from 'class-validator';

export class ProductCreateDto {
  @MinLength(3, {
    message: 'Le titre doit contenir au moins 3 caractères',
  })
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsString()
  image: string;
  @IsString()
  color: string;
}

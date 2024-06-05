import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './controller/product.controller';
import { GetAllProductsService } from './use-case/get-all-products.service';
import { CreateProductService } from './use-case/create-product.service';
import { DeleteProductService } from './use-case/delete-product.service';
import { GetProductByIdService } from './use-case/get-product-by-id.service';
import { UpdateProductService } from './use-case/update-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    GetAllProductsService,
    CreateProductService,
    DeleteProductService,
    GetProductByIdService,
    UpdateProductService,
  ],
})
export class ProductModule {
}

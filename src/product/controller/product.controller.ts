import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GetAllProductsService } from '../use-case/get-all-products.service';
import { ProductCreateDto } from '../dto/product-create.dto';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { GetProductByIdService } from '../use-case/get-product-by-id.service';
import { CreateProductService } from '../use-case/create-product.service';
import { UpdateProductService } from '../use-case/update-product.service';
import { DeleteProductService } from '../use-case/delete-product.service';
@Controller('products')
export class ProductController {
  constructor(
    private readonly getAllProductsService: GetAllProductsService,
    private readonly getProductByIdService: GetProductByIdService,
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
) {}

  @Get()
  getAllProducts() {
    return this.getAllProductsService.getAllProducts();
  }

  @Get(':id')
  getOneProductById(@Param('id', ParseIntPipe) id: number) {
    return this.getProductByIdService.getOneProductById(id);
  }

  @Post()
  createProduct(@Body() data: ProductCreateDto) {
    return this.createProductService.createProduct(data);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ProductUpdateDto,
  ) {
    return this.updateProductService.updateProduct(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.deleteProductService.deleteProduct(id);
  }
}

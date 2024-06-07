import { ProductCreateDto } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

export class GetProductByIdService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  async getOneProductById(id: number) {
    return await this.productRepository.findOneBy({ id });
  }
}
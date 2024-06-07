import { ProductCreateDto } from '../dto/product-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductUpdateDto } from '../dto/product-update.dto';
import { Product } from '../entity/product.entity';

export class UpdateProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  async updateProduct(id: number, data: ProductUpdateDto) {
    // on récupère l'article ciblé
    const product = await this.productRepository.findOneBy({ id });
    // on "merge" les données du body de la requête
    // avec les données déjà présentes dans l'article
    const productUpdate = { ...product, ...data };
    // on sauvegarde l'article mis à jour
    await this.productRepository.save(productUpdate);

    return productUpdate;
  }
}
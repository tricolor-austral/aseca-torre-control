import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async checkIfThereIsStock(@Param('id') id: string, qty: number) {
    return await this.productService.checkIfThereIsStock(id, qty);
  }
}

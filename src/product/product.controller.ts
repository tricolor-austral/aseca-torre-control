import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/CreateProductDto';
import { UpdateStockDto } from './dto/UpdateStcokDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return await this.productService.createProduct(createProductDto);
  }

  @Put()
  async addStock(@Body() updateStcokDto: UpdateStockDto) {
    return await this.productService.addStock(
      updateStcokDto.id,
      updateStcokDto.qty,
    );
  }

  @Get(':id')
  async checkIfThereIsStock(@Param('id') id: string, qty: number) {
    return await this.productService.checkIfThereIsStock(id, qty);
  }
}

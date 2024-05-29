import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { ProductService } from './product.service';
import {CreateProductDto} from "./dto/CreateProductDto";

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto)
    return await this.productService.createProduct(createProductDto);
  }


  @Put(':id')
  async addStock(@Param('id') id: string, qty: number) {
    return await this.productService.addStock(id, qty);
  }


  @Get(':id')
  async checkIfThereIsStock(@Param('id') id: string, qty: number) {
    return await this.productService.checkIfThereIsStock(id, qty);
  }
}

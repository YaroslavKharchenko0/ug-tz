import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { ProductServiceImpl, ProductService } from "../services";
import { CreateProductDto, FindProductQueryDto } from "../dtos";
import { CreateProductDocs, DeleteProductDocs, FindProductsDocs, IsStringNumberPipe } from "@app/shared";

@Controller('products')
export class HttpController {
  constructor(
    @Inject(ProductServiceImpl) private readonly productService: ProductService
  ) { }

  @Post()
  @CreateProductDocs()
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Delete(':id')
  @DeleteProductDocs()
  async deleteProduct(@Param('id', IsStringNumberPipe) id: number) {
    return this.productService.deleteProduct({ id });
  }

  @Get()
  @FindProductsDocs()
  async findProducts(@Query() pagination: FindProductQueryDto) {
    return this.productService.findProducts({ pagination });
  }
}

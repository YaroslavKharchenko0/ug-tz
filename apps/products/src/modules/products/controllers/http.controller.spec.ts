import { Test, TestingModule } from '@nestjs/testing';
import { HttpController } from './http.controller';
import { ProductServiceImpl } from '../services';

describe('HttpController', () => {
  let controller: HttpController;
  let productService: ProductServiceImpl;

  const mockProductService = {
    createProduct: jest.fn(),
    deleteProduct: jest.fn(),
    findProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpController],
      providers: [
        { provide: ProductServiceImpl, useValue: mockProductService },
      ],
    }).compile();

    controller = module.get<HttpController>(HttpController);
    productService = module.get<ProductServiceImpl>(ProductServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('Should create product by service', async () => {
      const dto = { name: 'New Product', price: 150 };
      const createdProduct = { id: 1, ...dto };
      mockProductService.createProduct.mockResolvedValue(createdProduct);

      const result = await controller.createProduct(dto);
      expect(result).toEqual(createdProduct);
      expect(productService.createProduct).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteProduct', () => {
    it('Should delete product by service', async () => {
      const id = 1;
      mockProductService.deleteProduct.mockResolvedValue(undefined);

      const result = await controller.deleteProduct(id);
      expect(result).toBeUndefined();
      expect(productService.deleteProduct).toHaveBeenCalledWith({ id });
    });
  });

  describe('findProducts', () => {
    it('Should return list of products', async () => {
      const query = { page: 1, limit: 10 };
      const products = [{ id: 1, name: 'Product', price: 100 }];
      mockProductService.findProducts.mockResolvedValue(products);

      const result = await controller.findProducts(query);
      expect(result).toEqual(products);
      expect(productService.findProducts).toHaveBeenCalledWith({ pagination: query });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductServiceImpl } from './product.service'
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { PgProductRepository } from '../repositories';
import { DI } from '../../../di';

const mockRepository = {
  createProduct: jest.fn(),
  deleteProduct: jest.fn(),
  findProducts: jest.fn(),
};

const mockClientProxy = {
  emit: jest.fn().mockReturnValue(of({})),
};

describe('ProductServiceImpl', () => {
  let service: ProductServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductServiceImpl,
        { provide: PgProductRepository, useValue: mockRepository },
        { provide: DI.NOTIFICATION.CLIENT, useValue: mockClientProxy },
      ],
    }).compile();

    service = module.get<ProductServiceImpl>(ProductServiceImpl);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    it('Should create product & emit event', async () => {
      const input = { name: 'Test Product', price: 100 };
      const createdProduct = { id: 1, ...input };

      mockRepository.createProduct.mockResolvedValue(createdProduct);

      const result = await service.createProduct(input);

      expect(result).toEqual(createdProduct);
      expect(mockRepository.createProduct).toHaveBeenCalledWith(input);
      expect(mockClientProxy.emit).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ id: 1, name: 'Test Product', price: 100 })
      );
    });
  });

  describe('deleteProduct', () => {
    it('Should delete product & emit event', async () => {
      const input = { id: 1 };
      const deletedProduct = { id: 1, name: 'Test Product', price: 100 };

      mockRepository.deleteProduct.mockResolvedValue(deletedProduct);

      await service.deleteProduct(input);

      expect(mockRepository.deleteProduct).toHaveBeenCalledWith(input);
      expect(mockClientProxy.emit).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ id: 1 })
      );
    });

    it('Should throw not found exception', async () => {
      const input = { id: 2 };
      mockRepository.deleteProduct.mockResolvedValue(null);

      await expect(service.deleteProduct(input)).rejects.toThrow(NotFoundException);
      expect(mockRepository.deleteProduct).toHaveBeenCalledWith(input);
      expect(mockClientProxy.emit).not.toHaveBeenCalled();
    });
  });

  describe('findProducts', () => {
    it('Should find list of products', async () => {
      const pagination = { offset: 0, limit: 10 };
      const products = [{ id: 1, name: 'Test Product', price: 100 }];

      mockRepository.findProducts.mockResolvedValue(products);

      const result = await service.findProducts({ pagination });
      expect(result).toEqual(products);
      expect(mockRepository.findProducts).toHaveBeenCalledWith({ pagination });
    });
  });
});

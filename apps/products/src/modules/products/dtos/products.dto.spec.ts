import { ZodError } from 'zod';
import { CreateProductDto, FindProductQueryDto } from './products.dto';

describe('Validation', () => {
  describe('CreateProductDto', () => {
    it('should create a valid instance with correct data', () => {
      const input = { name: 'Test Product', price: 100 };
      const dto = CreateProductDto.schema.parse(input);
      expect(dto.name).toEqual(input.name);
      expect(dto.price).toEqual(input.price);
    });

    it('should throw error if name is missing', () => {
      const input = { price: 100 };
      expect(() => CreateProductDto.schema.parse(input)).toThrow(ZodError);
    });

    it('should throw error if price is negative', () => {
      const input = { name: 'Test Product', price: -50 };
      expect(() => CreateProductDto.schema.parse(input)).toThrow(ZodError);
    });

    it('should throw error if price exceeds max limit', () => {
      const input = { name: 'Test Product', price: 1000000 };
      expect(() => CreateProductDto.schema.parse(input)).toThrow(ZodError);
    });

    it('should throw error if name exceeds maximum length', () => {
      const input = { name: 'a'.repeat(101), price: 100 };
      expect(() => CreateProductDto.schema.parse(input)).toThrow(ZodError);
    });
  });
  describe('FindProductQueryDto', () => {
    it('should transform valid query strings to numbers', () => {
      const input = { offset: '0', limit: '10' };
      const dto = FindProductQueryDto.schema.parse(input);
      expect(dto.offset).toEqual(0);
      expect(dto.limit).toEqual(10);
    });

    it('should throw error for invalid offset (negative number)', () => {
      const input = { offset: '-1', limit: '10' };
      expect(() => FindProductQueryDto.schema.parse(input)).toThrow(ZodError);
    });

    it('should throw error for invalid limit (zero)', () => {
      const input = { offset: '0', limit: '0' };
      expect(() => FindProductQueryDto.schema.parse(input)).toThrow(ZodError);
    });

    it('should throw error for non-numeric offset', () => {
      const input = { offset: 'abc', limit: '10' };
      expect(() => FindProductQueryDto.schema.parse(input)).toThrow(ZodError);
    });

    it('should throw error for non-numeric limit', () => {
      const input = { offset: '0', limit: 'abc' };
      expect(() => FindProductQueryDto.schema.parse(input)).toThrow(ZodError);
    });
  });
})

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@ApiOperation({
		summary: 'Register a new Product',
	})
	create(@Body() dto: CreateProductDto) {
		return this.productsService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: 'List all products',
	})
	findAll(): Promise<Product[]> {
		return this.productsService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Search one Product by ID',
	})
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Patch one Product data information by ID',
	})
	update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
		return this.productsService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete one Product by ID',
	})
	remove(@Param('id') id: string) {
		return this.productsService.remove(id);
	}
}

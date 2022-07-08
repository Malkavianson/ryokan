import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Favorite } from 'src/favorites/entities/favorite.entitiy';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@ApiOperation({
		summary: 'Register a new Product',
	})
	async create(@Body() dto: CreateProductDto): Promise<Product | void> {
		return await this.productsService.create(dto);
	}

	@Post('fav')
	@ApiOperation({
		summary: 'User new favorite product',
	})
	async favorite(@Body() dto: FavoriteProductDto): Promise<Favorite> {
		return await this.productsService.favorite(dto);
	}

	@Get()
	@ApiOperation({
		summary: 'List all products',
	})
	async findAll(): Promise<Product[]> {
		return await this.productsService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Search one Product by ID',
	})
	async findOne(@Param('id') id: string): Promise<Product> {
		return await this.productsService.findOne(id);
	}

	@Get(':id/fav')
	@ApiOperation({
		summary: 'List all users that favorited one Product by ID',
	})
	async findAllFavUsersById(@Param('id') id: string): Promise<Favorite[]> {
		return await this.productsService.findAllFavUsersById(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Patch one Product data information by ID',
	})
	async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<Product | void> {
		return await this.productsService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete one Product by ID',
	})
	async remove(@Param('id') id: string) {
		return await this.productsService.remove(id);
	}

	@Delete('fav/:id')
	@ApiOperation({
		summary: 'Delete one Product favorited for one User by ID',
	})
	async disFav(@Param('id') id: string) {
		return await this.productsService.disFav(id);
	}

	@Delete('favAll/:id')
	@ApiOperation({
		summary: 'Delete all users that favorited one Product by ID',
	})
	async disfavAll(@Param('id') id: string) {
		return await this.productsService.disFavAll(id);
	}
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@UseGuards(AuthGuard())
@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	@ApiOperation({
		summary: 'Product Category creator',
	})
	create(@Body() dto: CreateCategoryDto): Promise<Category> {
		return this.categoriesService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: 'List all Products Categories',
	})
	findAll(): Promise<Category[]> {
		return this.categoriesService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'List one Product Category by ID',
	})
	findOne(@Param('id') id: string): Promise<Category> {
		return this.categoriesService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Patch one Product Category by ID',
	})
	update(@Param('id') id: string, @Body() dto: UpdateCategoryDto): Promise<Category> {
		return this.categoriesService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete one Product Category by ID',
	})
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(id);
	}
}

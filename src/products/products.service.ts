import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FavoriteProductDto } from './dto/favorite-product.dto';

@Injectable()
export class ProductsService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnProduct(id: string): Promise<Product> {
		const product: Product = await this.prisma.product.findUnique({
			where: { id },
		});

		if (!product) {
			throw new NotFoundException(`Id: '${id}' not found`);
		}

		return product;
	}

	async create(dto: CreateProductDto): Promise<Product | void> {
		return this.prisma.product.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	favorite(dto: FavoriteProductDto) {
		return this.prisma.favorite.create({ data: dto });
	}

	findAll(): Promise<Product[]> {
		return this.prisma.product.findMany();
	}

	findOne(id: string): Promise<Product> {
		return this.verifyIdAndReturnProduct(id);
	}

	async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
		await this.verifyIdAndReturnProduct(id);

		return this.prisma.product.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnProduct(id);

		return this.prisma.product.delete({ where: { id } });
	}
}

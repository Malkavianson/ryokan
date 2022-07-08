import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FavoriteProductDto } from '../favorites/dto/favorite.dto';
import { Favorite } from 'src/favorites/entities/favorite.entitiy';
import { User } from 'src/users/entities/users.entity';

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

	async verifyIdAndReturnProductFav(id: string): Promise<Favorite> {
		const favoriteId: Favorite = await this.prisma.favorite.findUnique({
			where: { id },
		});

		if (!favoriteId) {
			throw new NotFoundException(`Favorite Id: '${id}' not found`);
		}

		return favoriteId;
	}

	async create(dto: CreateProductDto): Promise<Product | void> {
		return await this.prisma.product.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	async favorite(dto: FavoriteProductDto): Promise<Favorite> {
		const product: Product = await this.prisma.product.findUnique({
			where: { name: dto.productName },
		});

		if (!product) {
			throw new NotFoundException(`Product ${dto.productName} not found`);
		}

		const user: User = await this.prisma.user.findUnique({
			where: { id: dto.userId },
		});

		if (!user) {
			throw new NotFoundException(`ID User '${dto.userId}' not found`);
		}

		return await this.prisma.favorite.create({ data: dto });
	}

	async findAll(): Promise<Product[]> {
		return await this.prisma.product.findMany();
	}

	async findOne(id: string): Promise<Product> {
		return await this.verifyIdAndReturnProduct(id);
	}

	async findAllFavUsersById(id: string): Promise<Favorite[]> {
		const product: Product = await this.verifyIdAndReturnProduct(id);

		return await this.prisma.favorite.findMany({
			where: { productName: product.name },
			select: {
				productName: true,
				user: { select: { id: true, email: true } },
			},
		});
	}

	async update(id: string, dto: UpdateProductDto): Promise<Product | void> {
		await this.verifyIdAndReturnProduct(id);

		return await this.prisma.product.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnProduct(id);
		try {
			return await this.prisma.product.delete({ where: { id } });
		} catch (err) {
			throw new UnauthorizedException(`Product ID: '${id}' already favorited`);
		}
	}

	async disFav(id: string) {
		await this.verifyIdAndReturnProductFav(id);

		return await this.prisma.favorite.delete({ where: { id } });
	}

	async disFavAll(id: string) {
		const allUsers = await this.findAllFavUsersById(id);

		allUsers.forEach(async e => {
			const exFav = await this.prisma.favorite.findMany({ where: { userId: e.userId, productName: e.productName } });

			exFav.forEach(async e => {
				const favoriteId: Favorite = await this.prisma.favorite.findUnique({
					where: { id: e.id },
				});

				if (favoriteId) {
					await this.prisma.favorite.delete({ where: { id: e.id } });
				}
			});
		});
		return `Product id ${id} is no longer favorited!`;
	}
}

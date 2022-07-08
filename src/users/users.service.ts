import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { Favorite } from 'src/favorites/entities/favorite.entitiy';

@Injectable()
export class UsersService {
	private userSelect = {
		id: true,
		name: true,
		email: true,
		updatedAt: true,
		createdAt: true,
	};

	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnUser(id: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: { id },
			select: this.userSelect,
		});

		if (!user) {
			throw new NotFoundException(`Id: '${id}' Not found`);
		}

		return user;
	}

	async create(dto: CreateUserDto): Promise<User | void> {
		const hashedPassword = await bcrypt.hash(dto.password, 8);

		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
		};

		return await this.prisma.user.create({ data, select: this.userSelect }).catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany({ select: this.userSelect });
	}

	async findOne(id: string): Promise<User> {
		return await this.verifyIdAndReturnUser(id);
	}

	async findAllFav(id: string): Promise<Favorite[]> {
		await this.verifyIdAndReturnUser(id);
		return await this.prisma.favorite.findMany({ where: { userId: id } });
	}

	async update(id: string, dto: UpdateUserDto): Promise<User | void> {
		const hashedPassword = await bcrypt.hash(dto.password, 8);

		await this.verifyIdAndReturnUser(id);
		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
		};

		return await this.prisma.user.update({ where: { id }, data, select: this.userSelect }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnUser(id);

		return await this.prisma.user.delete({
			where: { id },
			select: { name: true, email: true },
		});
	}
}

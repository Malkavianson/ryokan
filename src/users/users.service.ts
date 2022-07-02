import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnUser(id: string): Promise<User> {
		const user: User = await this.prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException(`Id: '${id}' Not found`);
		}

		return user;
	}

	handleErrorConstraintUnique(error: Error): never {
		const splitedMessage = error.message.split('`');

		const errorMessage = `${splitedMessage[splitedMessage.length - 2]} already registred`;

		throw new UnprocessableEntityException(errorMessage);
	}

	async create(dto: CreateUserDto): Promise<User | void> {
		const hashedPassword = await bcrypt.hash(dto.password, 8);

		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
		};

		return this.prisma.user.create({ data }).catch(this.handleErrorConstraintUnique);
	}

	findAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	findOne(id: string): Promise<User> {
		return this.verifyIdAndReturnUser(id);
	}

	async update(id: string, dto: UpdateUserDto): Promise<User | void> {
		const hashedPassword = await bcrypt.hash(dto.password, 8);

		await this.verifyIdAndReturnUser(id);
		const data: CreateUserDto = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
		};

		return this.prisma.user.update({ where: { id }, data }).catch(this.handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnUser(id);

		return this.prisma.user.delete({
			where: { id },
			select: { name: true, email: true },
		});
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/users.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

	async login(dto: LoginDto): Promise<LoginResponseDto> {
		const { email, password } = dto;

		const user: User = await this.prisma.user.findUnique({ where: { email } });
		const passwordMatch: boolean = await bcrypt.compare(password, user.password);

		if (!user || !passwordMatch) {
			throw new NotFoundException('Invalid email or password ');
		}

		delete user.password;

		const token: string = this.jwtService.sign({ email });

		return { token, user };
	}
}

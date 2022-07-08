import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Favorite } from '../favorites/entities/favorite.entitiy';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: 'Register a new User',
	})
	async create(@Body() dto: CreateUserDto): Promise<User | void> {
		return await this.usersService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: 'List all Users',
	})
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Search one User by ID',
	})
	async findOne(@Param('id') id: string): Promise<User> {
		return await this.usersService.findOne(id);
	}

	@Get(':id/fav')
	@ApiOperation({
		summary: 'List all favorites products of one User by ID',
	})
	async findAllFav(@Param('id') id: string): Promise<Favorite[]> {
		return await this.usersService.findAllFav(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Patch User data by ID',
	})
	async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User | void> {
		return await this.usersService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete one User by ID',
	})
	async remove(@Param('id') id: string) {
		return await this.usersService.remove(id);
	}
}

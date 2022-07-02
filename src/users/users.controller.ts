import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
	create(@Body() dto: CreateUserDto): Promise<User | void> {
		return this.usersService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: 'List all Users',
	})
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Search one User by ID',
	})
	findOne(@Param('id') id: string): Promise<User> {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Patch User data by ID',
	})
	update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User | void> {
		return this.usersService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete one User by ID',
	})
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}

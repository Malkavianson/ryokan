import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users-entities';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
	users: User[] = [];

	getAll(): User[] {
		console.log(this.users);
		return this.users;
	}
	create(createUserDto: CreateUserDto): User {
		const newUser: User = { id: uuid(), ...createUserDto };
		this.users.push(newUser);
		console.log(newUser);
		return newUser;
	}
}

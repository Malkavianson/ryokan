import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'User name',
		example: 'Alexandre',
	})
	name: string;
	@IsEmail()
	@ApiProperty({
		description: 'email',
		example: 'ale@ale.com',
	})
	email: string;
}

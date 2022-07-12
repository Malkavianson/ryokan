import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
	@IsEmail()
	@ApiProperty({
		description: 'User mail',
		example: 'user@mail.this',
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'User password',
		example: 'thing*135',
	})
	password: string;
}

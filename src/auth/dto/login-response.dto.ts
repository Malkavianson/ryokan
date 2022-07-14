import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/users.entity';

export class LoginResponseDto {
	@ApiProperty({
		description: 'Token Login',
		example: 'oyJhbGcaOaJIUzI1NaIrIlR5cCI6IktXVCJ9.oyJzdWIaOaIxMjM0NTY3ODkwIawabmFpZSI6IktviG4gRG9nIawaiWF0IjexNTE2MjM5MDIyfQ.SfnKxwRJSMoKKF2QT4fwtMoJf36POk6yJV_idQrrw5c',
	})
	token: string;

	@ApiProperty({
		description: 'Login userdata',
	})
	user: User;
}

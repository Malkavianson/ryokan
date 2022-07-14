import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
	controllers: [ProductsController],
	providers: [ProductsService, JwtStrategy],
})
export class ProductsModule {}

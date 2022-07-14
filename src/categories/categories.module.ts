import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}

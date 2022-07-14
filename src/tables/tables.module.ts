import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
	controllers: [TablesController],
	providers: [TablesService],
})
export class TablesModule {}

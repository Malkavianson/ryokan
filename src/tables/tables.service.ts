import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
	constructor(private readonly prisma: PrismaService) {}

	async verifyIdAndReturnTable(id: string): Promise<Table> {
		const table: Table = await this.prisma.table.findUnique({
			where: { id },
		});

		if (!table) {
			throw new NotFoundException(`Table id:'${id}' not found`);
		}

		return table;
	}

	async create(dto: CreateTableDto): Promise<Table | void> {
		return this.prisma.table.create({ data: dto }).catch(handleErrorConstraintUnique);
	}

	async findAll(): Promise<Table[]> {
		return this.prisma.table.findMany();
	}

	async findOne(id: string): Promise<Table> {
		return this.verifyIdAndReturnTable(id);
	}

	async update(id: string, dto: UpdateTableDto) {
		this.verifyIdAndReturnTable(id);

		return this.prisma.table.update({ where: { id }, data: dto }).catch(handleErrorConstraintUnique);
	}

	async remove(id: string) {
		await this.verifyIdAndReturnTable(id);

		return this.prisma.table.delete({
			where: { id },
		});
	}
}

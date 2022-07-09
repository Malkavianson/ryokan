import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderDto {
	@IsNumber()
	@IsPositive()
	@ApiProperty({
		description: 'Table Number',
		example: 10,
	})
	tableNumber: number;

	@IsUUID()
	@ApiProperty({
		description: 'Costumer User ID',
		example: '[12345abc-ab1d-12a3-1ab2-12a3b456c789, 12345abc-ab1d-12a3-1ab2-12a3b456c780]',
	})
	userId: string;

	@IsUUID(undefined, { each: true })
	@ApiProperty({
		description: 'Id list of Products in the order',
		example: '[02345abc-ab1d-12a3-1ab2-12a3b456c780, 02345abc-ab1d-12a3-1ab2-12a3b456c789]',
	})
	products: string[];
}

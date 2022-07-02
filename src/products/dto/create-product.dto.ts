import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Name of Product',
		example: 'Temaki Hot Philadelphia',
	})
	name: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: 'Description of Product',
		example: 'Fried Temaki of Salmon and Cream Cheese ',
	})
	description: string;

	@IsNumber({
		maxDecimalPlaces: 2,
	})
	@ApiProperty({
		description: 'Price of Product',
		example: 5.99,
	})
	price: number;

	@IsUrl()
	@ApiProperty({
		description: 'Link to product Image',
		example: 'https://instadelivery-public.nyc3.digitaloceanspaces.com/itens/ZUltUeqT45PZpU5uCUrZTxwCoOtkNGmElHk9yFx5.jpg',
	})
	image: string;
}

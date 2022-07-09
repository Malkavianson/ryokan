import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Order } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@ApiOperation({
		summary: 'Register a new Order',
	})
	async create(@Body() dto: CreateOrderDto) {
		return await this.ordersService.create(dto);
	}

	@Get()
	@ApiOperation({
		summary: 'List all Orders',
	})
	async findAll() {
		return await this.ordersService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Search one Order by ID',
	})
	async findOne(@Param('id') id: string) {
		return await this.ordersService.findOne(id);
	}

	// @Patch(':id')
	// @ApiOperation({
	// 	summary: 'Patch one Order data information by ID',
	// })
	// async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
	// 	return await this.ordersService.update(+id, updateOrderDto);
	// }
	// @Delete(':id')
	// @ApiOperation({
	// 	summary: 'Delete one Order by ID',
	// })
	// async remove(@Param('id') id: string) {
	// 	return await this.ordersService.remove(+id);
	// }
}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3333;

async function bootstrap() {
	console.clear();
	console.log('Starting and validating');

	const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

	app.set('trust proxy', 1);

	app.useGlobalPipes(new ValidationPipe());

	console.log('Server Started\n\nMapping documentation');

	const config = new DocumentBuilder()
		.setTitle('Ryokan')
		.setDescription('API de controle de Ryokan')
		.setVersion('1.1')
		.addTag('Status')
		.addTag('Users')
		.addTag('Tables')
		.addTag('Products')
		.addTag('Categories')
		.addBearerAuth()
		.addServer('https://ryokan-production.up.railway.app/')
		.addServer('http://localhost:3333')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	console.log('Swagger.setup Builded');
	console.log('Mapping routes:');

	await app.listen(PORT, () => console.log(`App bootstraped at http://localhost:${PORT}`));
}
bootstrap();

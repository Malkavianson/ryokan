import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 3333;

async function bootstrap() {
	console.clear();
	console.log('Starting and validating');
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	console.log('Server Started\n\nMapping documentation');

	const config = new DocumentBuilder().setTitle('Ryokan').setDescription('API de controle de Ryokan').setVersion('1.1').addTag('Users').addTag('Products').addTag('Tables').addTag('Status').addServer('http://localhost:3333').build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);
	console.log('Swagger.setup Builded');

	app.enableCors();
	console.log('CORS Enabled\n\nMapping routes:');
	await app.listen(PORT, () => console.log(`App bootstraped at http://localhost:${PORT}`));
}
bootstrap();

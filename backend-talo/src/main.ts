import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	
	app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

	await app.listen(process.env.APP_PORT as string);
}
bootstrap();

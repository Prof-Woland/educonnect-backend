import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { AllExceptionFilter } from './common/filters/allException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://educonnect-frontend-five.vercel.app/',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  });
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './core/not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['Authorization', 'authorization'],
  });
  app.useGlobalInterceptors(new NotFoundInterceptor());

  await app.listen(8000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
});


  // Serve arquivos estáticos da pasta /uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/files/',
  });

  await app.listen(3000);
  console.log(`🚀 Server is running at http://localhost:3000`);
}
bootstrap();

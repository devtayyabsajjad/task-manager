import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

let app: any;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: ['http://localhost:5173', 'https://task-manager-0d77.onrender.com', /\.vercel\.app$/],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    
    await app.init();
  }
  return app;
}

// For serverless (Vercel)
export default async function handler(req: any, res: any) {
  const app = await createApp();
  return app.getHttpAdapter().getInstance()(req, res);
}

// For local development
async function bootstrap() {
  const app = await createApp();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 4000;
  await app.listen(PORT);
}

if (require.main === module) {
  bootstrap();
}

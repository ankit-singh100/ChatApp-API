import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable cookies
  // app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

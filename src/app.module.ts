import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, AuthModule, MessagesModule, CloudinaryModule],
})
export class AppModule {}

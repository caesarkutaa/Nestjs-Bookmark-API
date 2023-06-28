import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(config),UserModule, BookmarkModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

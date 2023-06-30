import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { Bookmark } from 'src/entites/bookmark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarkService],
  controllers: [BookmarkController]
})
export class BookmarkModule {}

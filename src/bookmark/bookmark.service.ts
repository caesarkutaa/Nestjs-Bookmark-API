import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  
  import {
    CreateBookmarkDto,
    EditBookmarkDto,
  } from './dto';
import { Bookmark } from 'src/entites/bookmark.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
  
  @Injectable()
  export class BookmarkService {
    constructor(@InjectRepository(Bookmark) private readonly boomarkRepo:Repository<Bookmark>,) {}
  
    async findAllBookmarksByUserId(userId: number): Promise<Bookmark[]> {
      return this.boomarkRepo.find({ where: { user: { id: userId } } });
    }
    // getBookmarkById(
    //     userId: number,
    //   bookmarkId: number
    // ) {
    //   return this.boomarkRepo.find({
    //     where: {
    //         id: bookmarkId,
    //         user: { id: userId },
    //     },
    //   });
    // }

    async getBookmarkById(bookmarkId: number): Promise<Bookmark | undefined> {
        return this.boomarkRepo.findOne({ where: { id: bookmarkId } } );
      }
  
    async createBookmark(
      userId: number,
      dto: CreateBookmarkDto,
    ) {
      const bookmark =
        await this.boomarkRepo.create({
            user: { id: userId },
            ...dto,
          
        });
  
        return this.boomarkRepo.save(bookmark);
    }


  
    async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto): Promise<Bookmark> {
      const bookmark = await this.boomarkRepo.findOne({
        where: { id: bookmarkId },
        relations: ['user'],
      });
  
      if (!bookmark || bookmark.user.id !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }
  
      bookmark.title = dto.title;
      bookmark.description = dto.description;
      bookmark.link = dto.link;
      // Update other properties of the bookmark if necessary

      delete bookmark.user.password; // Remove the password property from the user object
  
      return this.boomarkRepo.save(bookmark);
    }
  
    async deleteBookmarkById(userId: number, bookmarkId: number): Promise<void> {
      const bookmark = await this.boomarkRepo.findOne({
        where: { id: bookmarkId },
        relations: ['user'],
      });
  
      if (!bookmark || bookmark.user.id !== userId) {
        throw new ForbiddenException('Access to resources denied');
      }
  
      await this.boomarkRepo.delete(bookmarkId);
    }
  }
import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { GetUser } from '../auth/decorator/get-user.decorator';
  import { JwtGuard } from '../auth/Guards/jwt.guard';
  import { BookmarkService } from './bookmark.service';
  import {
    CreateBookmarkDto,
    EditBookmarkDto,
  } from './dto';
import { Bookmark } from 'src/entites/bookmark.entity';
  
  //  @UseGuards(JwtGuard)
  @Controller('bookmarks')
  export class BookmarkController {
    constructor(
      private bookmarkService: BookmarkService,
    ) {}
  

    @Get(':userId')
  async findAllBookmarksByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Bookmark[]> {
    return this.bookmarkService.findAllBookmarksByUserId(userId);
  }
  
    
    @Get(':bookmarkId')
    async getBookmarkById(@Param('bookmarkId', ParseIntPipe) bookmarkId: number): Promise<Bookmark | undefined> {
      return this.bookmarkService.getBookmarkById(bookmarkId);
    }
  
    @Post(':userId')
    createBookmark(
      @Param('userId', ParseIntPipe) userId: number,
      @Body() dto: CreateBookmarkDto,
    ) {
      return this.bookmarkService.createBookmark(
        userId,
        dto,
      );
    }


    @Put(':userId/:bookmarkId')
  async editBookmarkById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookmarkId', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ): Promise<Bookmark> {
    try {
      return await this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Bookmark not found');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Access to resources denied');
      }
      throw error;
    }
  }
  
  @Delete(':userId/:bookmarkId')
  async deleteBookmarkById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookmarkId', ParseIntPipe) bookmarkId: number,
  ): Promise<void> {
    try {
      await this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Bookmark not found');
      } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException('Access to resources denied');
      }
      throw error;
    }
  }
  }

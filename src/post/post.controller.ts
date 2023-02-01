import { Controller, Get, Query, Param, Body, Req, Put, Post, Delete } from '@nestjs/common';
import { PostService } from './post.service';

import {
    CreatePostDto,
    PaginationPostDto,
    UpdatePostDto,
} from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) {}

    @Get()
    async getPostList(@Query() { page, limit, start }: PaginationPostDto) {
        return this.postService.getPostList( page, limit, start);
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }

    @Post("create")
    async createPost(@Req() req: any, @Body() post : CreatePostDto) {
        return this.postService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
        return this.postService.replacePost(id, post);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        await this.postService.deletePost(id);
        return 1;
    }
}
import { Controller, Get, Query, Param, Body, Req, Put, Post } from '@nestjs/common';
import { PostService } from './post.service';

import {
    CreatePostDto,
    PaginationPostDto,
    UpdatePostDto,
} from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {}

    @Get()
    getAllPost(@Query() { }:{}) {
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }

    @Post()
    async createPost(@Req() req: any, @Body() post : CreatePostDto) {
        return this.postService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: {} ) {
    }
}
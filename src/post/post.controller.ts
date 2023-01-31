import { Controller, Get, Query, Param, Body, Req, Put, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    getAllPost(@Query() { }:{}) {
    }

    @Get()
    getPostById(@Param('id') id: string) {
    }

    @Post()
    async createPost(@Req() req: any, @Body() post: {}) {
    }

    @Put(':id')
    async replacePost(@Param('id') id: string, @Body() post: {} ) {
    }
}
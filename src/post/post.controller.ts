import { 
    Controller, 
    Get, 
    Query, 
    Param, 
    Body, 
    Req, 
    Put, 
    Post, 
    Delete, 
    UseGuards ,
    NotFoundException
} from '@nestjs/common';

import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

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

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPostList(@Req() req: any, @Query() { page, limit, start }: PaginationPostDto) {
        return this.postService.getPostList( page, limit, start);
    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
        const post = await this.postService.getPostById(id);
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post("create")
    async createPost(@Req() req: any, @Body() post : CreatePostDto) {
        const user = req.user;
        return this.postService.createPost(user , post);
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
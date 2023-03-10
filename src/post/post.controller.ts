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
    NotFoundException,
    CACHE_MANAGER,
    Inject
} from '@nestjs/common';

import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Cache } from 'cache-manager';


import {
    CreatePostDto,
    PaginationPostDto,
    UpdatePostDto,
} from './dto/post.dto';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

    @Get('get/category')
    async getByCategory(@Query('category_id') category_id: string) {
        return await this.postService.getByCategory(category_id);
    }
  
    @Get('get/categories')
    async getByCategories(@Query('category_ids') category_ids) {
        return await this.postService.getByCategories(category_ids);
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

    @Get('cache/set-cache')
    async demoSetCache() {
        try{
            await this.cacheManager.set('dangtung', 'testqqqq');
            return 1;
        }catch(e){
            console.log("errr : " , e);
        }

    }

    @Get('cache/get-cache')
    async demoGetCache() {
      return this.cacheManager.get('dangtung');
    }
}
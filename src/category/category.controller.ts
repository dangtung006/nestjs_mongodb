import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Query,
    Param
} 

from '@nestjs/common';

@Controller('category')
export class CategoryController {
   
    @Get()
    async getPostList(@Req() req: any) {
        
    }

    @Get(':id')
    async getPostById(@Param('id') id: string) {
     
    }

    
    @Post("create")
    async createPost(@Req() req: any) {
      
    }

    @Put(':id')
    async replacePost(@Param('id') id: string) {
        
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
    }
}

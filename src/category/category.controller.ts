import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Req,
    Query,
    Param,
    Body
} 
from '@nestjs/common';

import { CreateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
   
    @Get()
    async getCateList(@Req() req: any) {
        
    }

    @Get(':id')
    async getCateById(@Param('id') id: string) {
     
    }

    
    @Post("create")
    async createCate(@Req() req: any, @Body() category : CreateCategoryDto) {
        
    }

    @Put(':id')
    async replaceCate(@Param('id') id: string) {
        
    }

    @Delete(':id')
    async deleteCate(@Param('id') id: string) {
    }
}

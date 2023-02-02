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
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get()
    async getCateList(@Req() req: any) {
        return await this.categoryService.getAll();
    }

    @Get(':id')
    async getCateById(@Param('id') id: string) {
     
    }

    
    @Post("create")
    async createCate(@Req() req: any, @Body() category : CreateCategoryDto) {
        return await this.categoryService.create(category);
    }

    @Put(':id')
    async replaceCate(@Param('id') id: string) {
        
    }

    @Delete(':id')
    async deleteCate(@Param('id') id: string) {
    }
}

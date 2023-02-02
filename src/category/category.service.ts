import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ){}

    async getAll() {
        return await this.categoryRepository.getByCondition({});
    }
    
    async create(category: CreateCategoryDto) {
        return await this.categoryRepository.create(category);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseRepository } from '../common/base.repository';
import { Category } from './category.model';

@Injectable()
export class CategoryRepository extends BaseRepository<Category>{
    constructor(
        @InjectModel('Category')
        private readonly categoryModel : Model<Category>
    ){
        super(categoryModel)
    }
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSchema } from './post.model';
import { PostRepository } from './post.repository';
import { CategoryRepository } from '../category/category.repository';
import { CategorySchema } from '../category/category.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Post',
                schema: PostSchema,
            },

            {
                name: 'Category',
                schema: CategorySchema,
            },
        ])
    ],

    controllers: [PostController],
    
    providers: [
        PostService, 
        PostRepository,
        CategoryRepository
    ],
})
export class PostModule {}

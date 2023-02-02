import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';
import { CategoryRepository } from './category.repository';

@Module({
    
    imports : [
        MongooseModule.forFeature([
            {
                name: 'Category',
                schema: CategorySchema,
            },
        ])
    ],

    controllers: [CategoryController],
    providers: [CategoryService , CategoryRepository]
})
export class CategoryModule {}

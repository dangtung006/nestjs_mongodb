import { Module , CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSchema } from './post.model';
import { PostRepository } from './post.repository';
import { CategoryRepository } from '../category/category.repository';
import { CategorySchema } from '../category/category.model';
import { redisStore } from 'cache-manager-redis-store';

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
        ]),

        CacheModule.registerAsync<any>({
            isGlobal: true,
            useFactory: async () => {
                const store = await redisStore({
                    socket: { host: "localhost", port: 6379 },
                    ttl: 30,// seconds
                });

                return {
                    store: () => store,
                };
            },
        }),  
    ],

    controllers: [PostController],
    
    providers: [
        PostService, 
        PostRepository,
        CategoryRepository
    ],
})
export class PostModule {}

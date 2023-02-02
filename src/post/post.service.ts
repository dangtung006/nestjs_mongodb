import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';
import { CategoryRepository} from '../category/category.repository'
import { isValidObjectId } from 'mongoose';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly categoryRepository: CategoryRepository,
    ){}

    async getPostList(page: number, limit: number, start: string) {
        const count = await this.postRepository.countDocuments({});
        const count_page = (count / limit).toFixed();
        page = typeof page == 'number' && page > 0 ? page : 1;

        const posts = await this.postRepository.getByCondition(
            {
                // _id: {
                //     $gt: isValidObjectId(start) ? start : '000000000000000000000000',
                // },
            },

            null,
            {
                // sort: {
                //     _id: 1,
                // },
                skip: (page - 1) * limit,
                limit: Number(limit),
            },
        );

        return { count_page, posts };
    }

    async getPostById(post_id: string){
        return await this.postRepository.findById(post_id);
    }

    async createPost(user : any, post: CreatePostDto) {
        post = { ...post, user : user._id};
        console.log("post : " , post);
        const new_post = await this.postRepository.create(post);

        if(post.categories) {
            this.categoryRepository.updateMany(
                {
                    _id :  { $in: post.categories }
                },
                {
                    $push: {
                        posts: new_post._id,
                    }
                },
            )
        }
        
        return new_post;
    }

    async replacePost(post_id: string, data: UpdatePostDto) {
        return await this.postRepository.findByIdAndUpdate(post_id, data);
    }

    async deletePost(post_id : string){
        return  await this.postRepository.deleteOne(post_id);
    }

    async countPost(filter : any){
        return  await this.postRepository.countDocuments(filter);
    }
}
import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository
    ){}

    async createPost( post: CreatePostDto) {
        const new_post = await this.postRepository.create(post);
        return new_post;
    }

    async getPostById(post_id: string){
        const post = await this.postRepository.findById(post_id);
        console.log("post : " , post);
    }
}
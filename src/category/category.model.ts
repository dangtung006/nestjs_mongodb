import { Schema, Document } from 'mongoose';
import { Post } from './../post/post.model';

const CategorySchema = new Schema(
    {
        title: String,
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },

    {
        timestamps: true,
        collection: 'categories'
    },
);

export { CategorySchema };

export interface Category extends Document {
  title: string;
  posts: [Post];
}
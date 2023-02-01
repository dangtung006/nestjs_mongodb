import { Schema, Document } from 'mongoose';

const PostSchema = new Schema(
    {
        title: String,
        description: String,
        content: String,
    },
    {
        timestamps: true,
        // timestamps: {
        //   createdAt: 'created_at',
        //   updatedAt: 'updated_at',
        // },
        collection: 'posts',
    }
)

export { PostSchema }

export interface Post extends Document {
    title: string;
    description: string;
    content: string;
    // user: User;
    // tags: [string];
    // numbers: [number];
    // categories: [Category];
  }

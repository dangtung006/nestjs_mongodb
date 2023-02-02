import { Schema, Document } from 'mongoose';

const PostSchema = new Schema(
    {
        title: String,
        description: String,
        content: String,
        
        user : {
            type : Schema.Types.ObjectId,
            ref : 'User'
        }
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

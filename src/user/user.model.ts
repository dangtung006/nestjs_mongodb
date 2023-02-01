import { Schema, Document } from 'mongoose';

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        refreshToken: String,
        twoFactorAuthenticationSecret: String,
        isTwoFactorAuthenticationEnabled: { type: Boolean, default: false },
    },
    {
      collection: 'users',
    },
);

export { UserSchema };

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    refreshToken: string;
    twoFactorAuthenticationSecret: string;
    isTwoFactorAuthenticationEnabled: boolean;
}

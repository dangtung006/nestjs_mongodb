import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../common/base.repository';
import { User } from './user.model';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
    ) {
        super(userModel);
    }
}
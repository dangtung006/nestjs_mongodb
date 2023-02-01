import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserSchema } from './user.model';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            {
              name: 'User',
              schema: UserSchema,
            },
        ]),
    ],

    controllers: [UserController],

    providers: [
        UserService,
        UserRepository
    ]
})
export class UserModule {}

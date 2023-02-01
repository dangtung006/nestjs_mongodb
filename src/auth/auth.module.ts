import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserSchema } from '../user/user.model';



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

    controllers: [AuthController],

    providers: [
        AuthService, 
        {
            provide : 'USER_SERVICE',
            useClass : UserService
        },
        UserRepository
    ]
})

export class AuthModule {}

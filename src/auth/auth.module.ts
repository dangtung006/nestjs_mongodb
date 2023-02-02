import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserSchema } from '../user/user.model';
import { JwtStrategy } from './jwt.strategy';


@Module({ 
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            {
              name: 'User',
              schema: UserSchema,
            },
        ]),
        
        PassportModule,

        // PassportModule.register({
        //     defaultStrategy: 'jwt',
        //     property: 'user',
        //     session: false,
        // }),

        // JwtModule.registerAsync({
        //     imports: [ConfigModule],

        //     useFactory: async (configService: ConfigService) => ({
        //         secret: configService.get('SECRETKEY'),
        //         signOptions: {
        //             expiresIn: configService.get('EXPIRESIN'),
        //         },
        //     }),

        //     inject: [ConfigService],
        // }),

        JwtModule.register({
            secret: process.env.SECRETKEY
        }),
    ],

    controllers: [AuthController],

    providers: [
        AuthService, 
        {
            provide : 'USER_SERVICE',
            useClass : UserService
        },
        JwtStrategy,
        UserRepository
    ]
})

export class AuthModule {}

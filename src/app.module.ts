import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { join } from 'path';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }), 

        // MongooseModule.forRootAsync({
        //     imports: [ConfigModule],
        //     inject: [ConfigService],
        //     useFactory: (config: ConfigService) => ({
        //         uri: config.get<string>('MONGODB_URI'),
        //     })
        // }),

        MailerModule.forRoot({
            transport : {
                host : "smtp://user:password@smtp.gmail.com",
                secure : false,
                auth : {
                    user: "user",
                    pass: "password"
                }
            },

            defaults : {
                from : '"No Reply" <no-reply@localhost>',
            },

            template : {
                dir: join(__dirname, 'src/templates/email'),
                adapter: new EjsAdapter(),
                options: {
                    strict: true,
                },
            }
        }),
        
        MongooseModule.forRoot(process.env.MONGODB_URL, { retryAttempts : 10 }),
        PostModule,
        UserModule,
        AuthModule,
        CategoryModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
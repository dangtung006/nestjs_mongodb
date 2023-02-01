import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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

        MongooseModule.forRoot(process.env.MONGODB_URL, { retryAttempts : 10 }),
        PostModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
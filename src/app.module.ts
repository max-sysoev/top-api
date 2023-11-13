import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TopPageModule} from './top-page/top-page.module';
import {ProductModule} from './product/product.module';
import {ReviewModule} from './review/review.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';
import {getTelegramConfig} from "./configs/telegram.config";
import { HhModule } from './hh/hh.module';
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        MongooseModule.forRoot('mongodb://admin:admin@localhost/admin'),
        ConfigModule.forRoot({isGlobal: true}),
        AuthModule,
        TopPageModule,
        ProductModule,
        ReviewModule,
        FilesModule,
        SitemapModule,
        TelegramModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getTelegramConfig
        }),
        HhModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

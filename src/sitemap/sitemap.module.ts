import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import {TopPageModule} from "../top-page/top-page.module";

@Module({
  controllers: [SitemapController],
  imports: [TopPageModule]
})
export class SitemapModule {}

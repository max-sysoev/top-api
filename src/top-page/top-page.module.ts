import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TopPageModel, TopPageSchema} from "./top-page.model";

@Module({
  controllers: [TopPageController],
  imports: [MongooseModule.forFeature([
    {name: TopPageModel.name, schema: TopPageSchema}
  ])],
  providers: [TopPageService]
})
export class TopPageModule {}

import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageService } from './top-page.service';
import {MongooseModule} from "@nestjs/mongoose";
import {TopPageModel, TopPageSchema} from "./top-page.model";
import {HhService} from "../hh/hh.service";
import {HhModule} from "../hh/hh.module";

@Module({
  controllers: [TopPageController],
  imports: [MongooseModule.forFeature([
    {name: TopPageModel.name, schema: TopPageSchema}
  ]),
  HhModule],
  providers: [TopPageService],
  exports: [TopPageService]
})
export class TopPageModule {}

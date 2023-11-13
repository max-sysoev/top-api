import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import {TopPageModule} from "../top-page/top-page.module";
import {HttpModule} from "@nestjs/axios";

@Module({
  providers: [HhService],
  imports:  [HttpModule],
  exports: [HhService]
})
export class HhModule {}

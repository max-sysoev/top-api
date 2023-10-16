import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductModel, ProductSchema} from "./product.model";

@Module({
  controllers: [ProductController],
  imports: [MongooseModule.forFeature([
    {name: ProductModel.name, schema: ProductSchema}
  ])],
  providers: [ProductService]
})
export class ProductModule {}

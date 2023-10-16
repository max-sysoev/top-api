import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ProductModel} from "../product/product.model";
import {Model} from "mongoose";
import {TopLevelCategory, TopPageModel} from "./top-page.model";
import {CreateProductDto} from "../product/dto/create-product-dto";
import {CreateTopPageDto} from "./dto/create-top-page.dto";
import {FindProductDto} from "../product/dto/find-product.dto";
import {ReviewModel} from "../review/review.model";
import {FindTopPageDto} from "./dto/find-top-page.dto";

@Injectable()
export class TopPageService {

    constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageModel>) {
    }

    async create(dto: CreateTopPageDto): Promise<TopPageModel> {
        return this.topPageModel.create(dto);
    }

    async findById(id: string) {
        return this.topPageModel.findById(id).exec()
    }
    async findByAlias(alias: string) {
        return this.topPageModel.findOne({alias}).exec()
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        //The simplest
        // return this.topPageModel.find({firstCategory}, {alias: 1, secondCategory: 1, title: 1}).exec();

        //Variant #1
        return this.topPageModel.aggregate()
            .match({
                firstCategory: firstCategory
            })
            .group({
                _id: {secondCategory: '$secondCategory'},
                pages: {$push: {alias: '$alias', title: '$title'}}
            }).exec();


        //Variant #2
        // return await this.topPageModel.aggregate([
        //     {
        //         $match: {
        //             firstCategory: firstCategory
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: {secondCategory: '$secondCategory'},
        //             pages: {$push: {alias: '$alias', title: '$title'}}
        //         }
        //     }
        // ]).exec();
    }
    async findByText(text: string) {
        return this.topPageModel.find({$text: {$search: text, $caseSensitive: false}}).exec();
    }

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, {new: true}).exec();
    }

}

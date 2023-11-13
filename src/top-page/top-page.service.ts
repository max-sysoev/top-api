import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {TopLevelCategory, TopPageDocument, TopPageModel} from "./top-page.model";
import {CreateTopPageDto} from "./dto/create-top-page.dto";
import {subDays} from "date-fns";

@Injectable()
export class TopPageService {

    constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageDocument>) {
    }

    async create(dto: CreateTopPageDto): Promise<TopPageModel> {
        return this.topPageModel.create(dto);
    }

    async findById(id: string) {
        return this.topPageModel.findById(id).exec()
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({alias}).exec();
    }

    async findAll() {
        return this.topPageModel.find().exec();
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

    async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, {new: true}).exec();
    }

    async findForHhUpdate(date: Date) {
        return this.topPageModel.find({
            firstCategory: 0,
            $or: [
                {'hh.updated.At': { $lt: subDays(date, 1)}},
                {'hh.updated.At': { $exists: false }}
            ]
        }).exec();
    }

}

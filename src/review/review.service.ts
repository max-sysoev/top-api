import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ReviewDocument, ReviewModel} from "./review.model";
import {Model, Types} from "mongoose";
import {CreateReviewDto} from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(ReviewModel.name) private reviewModel: Model<ReviewModel>
    ) {}

    async getById(id: string){
        return this.reviewModel.findById(id);
    }

    //new
    async create(dto: CreateReviewDto){
        const newReview = new this.reviewModel(dto);
        return newReview.save();
    }

    async delete(id: string): Promise<ReviewModel | null> {
        return await this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<ReviewModel[] | null>{
        return await this.reviewModel.find({productId: productId}).exec();
        // return await this.reviewModel.find({productId: new Types.ObjectId('65105dd89337360d88b0701f')}).exec();
    }

    async deleteByProductId(productId: string): Promise<{}>{
        return this.reviewModel.deleteMany({productId: new Types.ObjectId(productId)}).exec();
    }

    //old
    // async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>>{
    //     return this.reviewModel.create(dto);
    // }
}

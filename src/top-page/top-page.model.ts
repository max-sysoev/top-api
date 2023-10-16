import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type TopPageDocument = HydratedDocument<TopPageModel>

export class HhData {

    @Prop()
    count: number;

    @Prop()
    juniorSalary: number;

    @Prop()
    middleSalary: number;

    @Prop()
    seniorSalary: number;
}

export class TopPageAdvantage {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

@Schema({timestamps: true})
export class TopPageModel {
    @Prop()
    firstCategory: TopLevelCategory;

    @Prop()
    secondCategory: string;

    @Prop({unique: true})
    alias: string;

    @Prop()
    title: string;

    @Prop()
    category: string;

    @Prop({type: HhData})
    hh?: HhData;

    @Prop({type: () => [TopPageAdvantage]})
    advantages: TopPageAdvantage[];

    @Prop()
    seoText: string;

    @Prop()
    tagsTitle: string;

    @Prop([String])
    tags: string[];
}


const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
TopPageSchema.index({ '$**': 'text' });

export { TopPageSchema };
import {TopLevelCategory} from "../top-page.model";
import {IsEnum, IsNumber} from "class-validator";

export class FindTopPageDto{
    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;
}
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<UserModel>

@Schema({timestamps: true})
export class UserModel {

    @Prop({unique: true})
    email: string;

    @Prop({required: true})
    passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
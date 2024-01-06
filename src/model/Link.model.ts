import { Model, Schema, model } from "mongoose";
import { ILink } from "../interface/Course.interface";

export const LinkSchema = new Schema<ILink>({
    title: String,
    url: String,
}, { timestamps: true })

// export const LinkModel: Model<ILink> = model('link', LinkSchema)
import { Model, Schema, model } from "mongoose";
import { IReview } from "../interface/Course.interface";

export const ReviewSchema = new Schema<IReview>({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String
}, { timestamps: true })

export const ReviewModel: Model<IReview> = model('review', ReviewSchema)
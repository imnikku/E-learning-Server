import { Model, Schema, model } from "mongoose";
import { IComment } from "../interface/Course.interface";

export const CommentSchema = new Schema<IComment>({
    user: Object,
    comment: String,
    commentReplies: [Object],

}, { timestamps: true })

// export const CommentModel: Model<IComment> = model('comment', CommentSchema)
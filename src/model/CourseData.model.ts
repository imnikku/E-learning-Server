import { Model, Schema, model } from "mongoose";
import { ICourseData } from "../interface/Course.interface";
import { LinkSchema } from "./Link.model";
import { CommentSchema } from "./Comment.model";

export const CourseDataSchema = new Schema<ICourseData>({
    videoUrl: String,
    videoThumbnail: String,
    title: String,
    videoSection: String,
    description: String,
    videoLength: Number,
    videoPlayer: String,
    links: [LinkSchema],
    suggestion: String,
    questions: [CommentSchema],

}, { timestamps: true })

// export const CourseDataModel: Model<ICourseData> = model('coursedata', CourseDataSchema)
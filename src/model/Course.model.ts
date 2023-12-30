import { Model, Schema, model } from "mongoose";
import { ICourse } from "../interface/Course.interface";
import { ReviewSchema } from "./Review.model";
import { CourseDataSchema } from "./CourseData.model";

export const CourseSchema = new Schema<ICourse>({
    name: {
        type: String,
        required: [true, "Please enter course name"],
    },
    description: {
        type: String,
        required: [true, 'Please enter course description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter course price']
    },
    estimatedPrice: Number,
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    tags: {
        type: String,
        required: [true, 'Please enter course tags']
    },
    level: {
        type: String,
        required: [true, 'Please enter course level']
    },
    demoUrl: {
        type: String,
        required: [true, "Please enter course demo url"]
    },
    benefits: [{ title: { type: String } }],
    prerequisites: [{ title: { type: String } }],
    reviews:[ReviewSchema],
    courseData:[CourseDataSchema],
    ratings:{
        type:Number,
        default:0
    },
    purchased:{
        type:Number,
        default:0
    }



}, { timestamps: true })

export const CourseModel: Model<ICourse> = model('Course', CourseSchema)
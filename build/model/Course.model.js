"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = exports.CourseSchema = void 0;
const mongoose_1 = require("mongoose");
const Review_model_1 = require("./Review.model");
const CourseData_model_1 = require("./CourseData.model");
exports.CourseSchema = new mongoose_1.Schema({
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
    reviews: [Review_model_1.ReviewSchema],
    courseData: [CourseData_model_1.CourseDataSchema],
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
exports.CourseModel = (0, mongoose_1.model)('Course', exports.CourseSchema);

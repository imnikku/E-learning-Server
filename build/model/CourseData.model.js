"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseDataModel = exports.CourseDataSchema = void 0;
const mongoose_1 = require("mongoose");
const Link_model_1 = require("./Link.model");
const Comment_model_1 = require("./Comment.model");
exports.CourseDataSchema = new mongoose_1.Schema({
    videoUrl: String,
    videoThumbnail: String,
    title: String,
    videoSection: String,
    description: String,
    videoLength: Number,
    videoPlayer: String,
    links: [Link_model_1.LinkSchema],
    suggestion: String,
    questions: [Comment_model_1.CommentSchema],
}, { timestamps: true });
exports.CourseDataModel = (0, mongoose_1.model)('coursedata', exports.CourseDataSchema);

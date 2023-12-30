"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String
}, { timestamps: true });
exports.ReviewModel = (0, mongoose_1.model)('review', exports.ReviewSchema);

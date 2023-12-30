"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.CommentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CommentSchema = new mongoose_1.Schema({
    user: Object,
    comment: String,
    commentReplies: [Object],
}, { timestamps: true });
exports.CommentModel = (0, mongoose_1.model)('comment', exports.CommentSchema);

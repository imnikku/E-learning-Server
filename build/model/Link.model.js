"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.LinkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LinkSchema = new mongoose_1.Schema({
    title: String,
    url: String,
}, { timestamps: true });
exports.LinkModel = (0, mongoose_1.model)('link', exports.LinkSchema);

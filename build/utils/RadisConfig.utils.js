"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.radis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const radisClient = () => {
    if (process.env.RADIS_URL) {
        console.log('Radis Connected');
        return process.env.RADIS_URL;
    }
    throw new Error('Radis connection failed.');
};
exports.radis = new ioredis_1.default(radisClient());

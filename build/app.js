"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Error_middleware_1 = require("./middleware/Error.middleware");
const User_route_1 = __importDefault(require("./routes/User.route"));
// Add body parser and add limit 
exports.app.use(express_1.default.json({ limit: '50mb' }));
// Cookie parser 
exports.app.use((0, cookie_parser_1.default)());
// Add cors policies ..........
exports.app.use((0, cors_1.default)({
    origin: process.env.ORIGIN || ['http://localhost:3000']
}));
// route ................... 
exports.app.use('/api/v1', User_route_1.default);
// Test api ....
exports.app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            success: true,
            message: 'working fine'
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
}));
// Unknown route .....
exports.app.all('*', (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// Error Middleware .....
exports.app.use(Error_middleware_1.ErrorMiddleware);

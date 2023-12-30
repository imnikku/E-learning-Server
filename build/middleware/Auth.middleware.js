"use strict";
// ################################### Authenticate User #########################################
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
exports.authorizedRoles = exports.isAuthenticated = void 0;
const CatchAsyncError_middleware_1 = require("./CatchAsyncError.middleware");
const ErrorHandler_utils_1 = __importDefault(require("../utils/ErrorHandler.utils"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RadisConfig_utils_1 = require("../utils/RadisConfig.utils");
exports.isAuthenticated = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) {
            return next(new ErrorHandler_utils_1.default('Please login to access this resource', 401));
        }
        const decode = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
        if (!decode) {
            return next(new ErrorHandler_utils_1.default("Access token is not valid", 401));
        }
        const user = yield RadisConfig_utils_1.radis.get(decode.id);
        if (!user) {
            return next(new ErrorHandler_utils_1.default('Access token is not valid', 401));
        }
        req.user = JSON.parse(user);
        next();
    }
    catch (error) {
        return next(new ErrorHandler_utils_1.default(error.message, 401));
    }
}));
// ############################### Validate User Role ######################################
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        var _a, _b;
        if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            return next(new ErrorHandler_utils_1.default(`Role: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
exports.authorizedRoles = authorizedRoles;

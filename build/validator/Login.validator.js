"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const ErrorHandler_utils_1 = __importDefault(require("../utils/ErrorHandler.utils"));
const LoginValidator = (req, res, next) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().messages({
            "any.required": "Please enter email",
            'string.base': "email must be string",
            'string.email': "Please enter valid email"
        }),
        password: joi_1.default.string().required().messages({
            "any.required": "Please enter password",
            "string.base": "password must be string"
        }),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return next(new ErrorHandler_utils_1.default(error === null || error === void 0 ? void 0 : error.message, 400));
    }
    else {
        next();
    }
    // console.log(error)
};
exports.LoginValidator = LoginValidator;

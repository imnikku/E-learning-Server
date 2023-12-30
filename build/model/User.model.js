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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Regex_utils_1 = require("../utils/Regex.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        minlength: [3, "Name must be at least 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return Regex_utils_1.emailRegexPattern.test(value);
            },
            message: 'Please enter a valid email.'
        },
        unique: true
    },
    password: {
        type: String,
        // required: [true, 'Please enter your password'],
        // validate: {
        //     validator: function (value: string) {
        //         return passwordRegexPattern.test(value)
        //     },
        //     message: 'Password must be at least eight characters,one uppercase letter, one lowercase letter, one number and one special character.'
        // },
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    courses: [{
            courseId: String
        }]
}, { timestamps: true });
// Hash password before saving ..............
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
// Compare Password ............................
userSchema.methods.comparePassword = function (enterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(enterPassword, this.password);
    });
};
// Sign Access Token ......
userSchema.methods.SignAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "5m"
    });
};
// Sign Refress Token ......
userSchema.methods.SignRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESS_TOKEN, {
        expiresIn: '3d'
    });
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);

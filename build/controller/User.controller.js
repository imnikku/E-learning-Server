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
exports.updateAvatar = exports.updatePassword = exports.updateUserInfo = exports.socialAuth = exports.getUserInfo = exports.updateAccessToken = exports.logoutUser = exports.loginUser = exports.activateUser = exports.createActivationToken = exports.registrationUser = void 0;
const CatchAsyncError_middleware_1 = require("../middleware/CatchAsyncError.middleware");
const ErrorHandler_utils_1 = __importDefault(require("../utils/ErrorHandler.utils"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ejs_1 = __importDefault(require("ejs"));
const User_model_1 = require("../model/User.model");
const path_1 = __importDefault(require("path"));
const SendMail_utils_1 = __importDefault(require("../utils/SendMail.utils"));
const Jwt_utils_1 = require("../utils/Jwt.utils");
const RadisConfig_utils_1 = require("../utils/RadisConfig.utils");
const User_service_1 = require("../services/User.service");
const cloudinary_1 = require("cloudinary");
// ############################ Register User #########################################
exports.registrationUser = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, avatar } = req.body;
    const isEmailExist = yield User_model_1.UserModel.findOne({ email });
    if (isEmailExist) {
        return next(new ErrorHandler_utils_1.default('Email already exist', 400));
    }
    const user = { name, email, password, avatar };
    const activationToken = (0, exports.createActivationToken)(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };
    const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../mails/activation-mail.ejs'), data);
    yield (0, SendMail_utils_1.default)({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data
    });
    res.status(201).json({
        success: true,
        message: `Please check your mail: ${user.email} to activate your account`,
        activationToken
    });
}));
//  ################################## Create Activation Token ####################################
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({ user, activationCode }, process.env.ACTIVATION_SECRET, {
        expiresIn: '5m'
    });
    return { activationCode, token };
};
exports.createActivationToken = createActivationToken;
// ############################### Activate User ###############################################
exports.activateUser = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { activation_token, activation_code } = req.body;
    const newUser = jsonwebtoken_1.default.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler_utils_1.default('Invalid activation Code', 400));
    }
    const { name, email, password } = newUser.user;
    const existUser = yield User_model_1.UserModel.findOne({ email });
    if (existUser) {
        return next(new ErrorHandler_utils_1.default('Email already exist', 400));
    }
    yield User_model_1.UserModel.create({ name, email, password });
    res.status(201).json({
        success: true,
        message: 'User activated successfully.'
    });
}));
// ################################ Login User ############################################
exports.loginUser = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_model_1.UserModel.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler_utils_1.default('Invalid email or password', 400));
    }
    const comparePassword = yield user.comparePassword(password);
    if (!comparePassword) {
        return next(new ErrorHandler_utils_1.default('Invalid email or password', 400));
    }
    (0, Jwt_utils_1.sendToken)(user, 200, res);
}));
// ################################# Logout user #######################################
exports.logoutUser = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    RadisConfig_utils_1.radis.del((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    res.status(200).json({
        success: true,
        message: "Logout Successfully."
    });
}));
// ##################################### Refresh token #########################################
exports.updateAccessToken = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.REFRESS_TOKEN);
    if (!decoded) {
        return next(new ErrorHandler_utils_1.default('Could not refresh token', 400));
    }
    const session = yield RadisConfig_utils_1.radis.get(decoded.id);
    if (!session) {
        return next(new ErrorHandler_utils_1.default('Could not refresh token', 400));
    }
    const user = JSON.parse(session);
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: '5m'
    });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESS_TOKEN, {
        expiresIn: '3d'
    });
    res.cookie('access_token', accessToken, Jwt_utils_1.accessTokenOptions);
    res.cookie('refresh_token', refreshToken, Jwt_utils_1.refreshTokenOptions);
    req.user = user;
    res.status(200).json({
        success: true,
        accessToken
    });
}));
// #############################  Get User Info ##############################################
exports.getUserInfo = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    (0, User_service_1.getUserById)(userId, res);
}));
// ############################# Social Auth ##############################################
exports.socialAuth = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, avatar } = req.body;
    const user = yield User_model_1.UserModel.findOne({ email });
    if (!user) {
        const newUser = yield User_model_1.UserModel.create({ email, name, avatar });
        (0, Jwt_utils_1.sendToken)(newUser, 200, res);
    }
    else {
        (0, Jwt_utils_1.sendToken)(user, 200, res);
    }
}));
// ###################### Update user info ######################################
exports.updateUserInfo = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { name, email } = req.body;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c._id;
    const user = yield User_model_1.UserModel.findById(userId);
    if (email && user) {
        const isEmailExist = yield User_model_1.UserModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler_utils_1.default('Email already exist', 400));
        }
        user.email = email;
    }
    if (name && user) {
        user.name = name;
    }
    yield (user === null || user === void 0 ? void 0 : user.save());
    yield RadisConfig_utils_1.radis.set(userId, JSON.stringify(user));
    res.status(200).json({
        success: true,
        user
    });
}));
// ############################ Update Password ##################################
exports.updatePassword = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const { newPassword, oldPassword } = req.body;
    if (!newPassword || !oldPassword) {
        return next(new ErrorHandler_utils_1.default('Please enter old password and new password', 400));
    }
    const user = yield User_model_1.UserModel.findById((_d = req.user) === null || _d === void 0 ? void 0 : _d._id).select('+password');
    if ((user === null || user === void 0 ? void 0 : user.password) === undefined) {
        return next(new ErrorHandler_utils_1.default('Invalid User', 400));
    }
    const isPasswordMatch = yield (user === null || user === void 0 ? void 0 : user.comparePassword(oldPassword));
    if (!isPasswordMatch) {
        return next(new ErrorHandler_utils_1.default('Invalid old password', 400));
    }
    user.password = newPassword;
    yield user.save();
    yield RadisConfig_utils_1.radis.set((_e = req.user) === null || _e === void 0 ? void 0 : _e._id, JSON.stringify(user));
    res.status(201).json({
        success: true,
        user
    });
}));
// ########################### Update Profile Picture ##############################
exports.updateAvatar = (0, CatchAsyncError_middleware_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h;
    const { avatar } = req.body;
    const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f._id;
    const user = yield User_model_1.UserModel.findById(userId);
    if (avatar && user) {
        if ((_g = user === null || user === void 0 ? void 0 : user.avatar) === null || _g === void 0 ? void 0 : _g.public_id) {
            yield cloudinary_1.v2.uploader.destroy((_h = user.avatar) === null || _h === void 0 ? void 0 : _h.public_id);
            const myCloud = yield cloudinary_1.v2.uploader.upload(avatar, {
                folder: 'avatar',
                width: 150
            });
            user.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url };
        }
        else {
            const myCloud = yield cloudinary_1.v2.uploader.upload(avatar, {
                folder: 'avatar',
                width: 150
            });
            user.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url };
        }
    }
    yield (user === null || user === void 0 ? void 0 : user.save());
    yield RadisConfig_utils_1.radis.set(userId, JSON.stringify(user));
    res.status(200).json({
        success: false,
        user
    });
}));

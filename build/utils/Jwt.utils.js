"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = exports.refreshTokenExpire = exports.accessTokenExpire = void 0;
const RadisConfig_utils_1 = require("./RadisConfig.utils");
exports.accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '5', 10);
exports.refreshTokenExpire = parseInt(process.env.REFRESS_TOKEN_EXPIRE || '59', 10);
// option for cookies ........
exports.accessTokenOptions = {
    expires: new Date(Date.now() + exports.accessTokenExpire * 60 * 1000),
    maxAge: exports.accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + exports.refreshTokenExpire * 60 * 1000),
    maxAge: exports.refreshTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refressToken = user.SignRefreshToken();
    // upload to radis ...
    RadisConfig_utils_1.radis.set(user._id, JSON.stringify(user));
    if (process.env.NODE_ENV == 'production') {
        exports.accessTokenOptions.secure = true;
        exports.refreshTokenOptions.secure = true;
    }
    res.cookie('refresh_token', refressToken, exports.refreshTokenOptions);
    res.cookie('access_token', accessToken, exports.accessTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        message: 'Login Successfully.'
    });
};
exports.sendToken = sendToken;

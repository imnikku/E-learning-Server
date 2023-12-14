import { Response } from "express";
import { IUser } from "../interface/User";
import { ITokenOption } from "../interface/jwt";
import { radis } from "./radisConfig";




export const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '5', 10)
export const refreshTokenExpire = parseInt(process.env.REFRESS_TOKEN_EXPIRE || '59', 10)
// option for cookies ........
export const accessTokenOptions: ITokenOption = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
}
export const refreshTokenOptions: ITokenOption = {
    expires: new Date(Date.now() + refreshTokenExpire * 60 * 1000),
    maxAge: refreshTokenExpire * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
}
export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refressToken = user.SignRefreshToken();


    // upload to radis ...
    radis.set(user._id, JSON.stringify(user) as any)

    if (process.env.NODE_ENV == 'production') {
        accessTokenOptions.secure = true;
        refreshTokenOptions.secure = true
    }
    res.cookie('refresh_token', refressToken, refreshTokenOptions)
    res.cookie('access_token', accessToken, accessTokenOptions)

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        message: 'Login Successfully.'
    })


}
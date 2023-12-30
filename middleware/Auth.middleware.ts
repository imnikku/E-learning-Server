

// ################################### Authenticate User #########################################

import { NextFunction, Response } from "express";
import { CatchAsyncError } from "./CatchAsyncError.middleware";
import ErrorHandler from "../utils/ErrorHandler.utils";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { radis } from "../utils/RadisConfig.utils";
import { IGetUserAuthInfoRequest } from "../interface/Request.interface";

export const isAuthenticated = CatchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token as string;
        if (!access_token) {
            return next(new ErrorHandler('Please login to access this resource', 401))
        }
        const decode = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
        if (!decode) {
            return next(new ErrorHandler("Access token is not valid", 401));
        }

        const user = await radis.get(decode.id);
        if (!user) {
            return next(new ErrorHandler('Access token is not valid', 401))
        }
        req.user = JSON.parse(user)
        next()

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 401))
    }

})

// ############################### Validate User Role ######################################
export const authorizedRoles = (...roles: string[]) => {
    return (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?._id)) {
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403))
        }
        next()
    }
}
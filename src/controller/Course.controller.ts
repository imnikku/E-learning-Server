import { NextFunction, Response } from "express";
import { IGetUserAuthInfoRequest } from "../interface/Request.interface";
import { CatchAsyncError } from "../middleware/CatchAsyncError.middleware";
import { v2 as cloudinary } from 'cloudinary'




// Upload Course .........
export const uploadCourse = CatchAsyncError(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
        const myCloud = await cloudinary.uploader.upload(thumbnail, {
            folder: 'courses'
        })
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url

        }
    }
})
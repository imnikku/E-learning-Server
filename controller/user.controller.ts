import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { IActivationToken, IRegistrationBody } from "../interface/User";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { Secret } from 'jsonwebtoken'
import ejs from 'ejs'
import { UserModel } from "../model/user.model";
import path from "path";
import sendEmail from "../utils/sendMail";

// ############################ Register User #########################################
export const registrationUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, avatar } = req.body as IRegistrationBody;
        const isEmailExist = await UserModel.findOne({ email })
        if (isEmailExist) {
            return next(new ErrorHandler('Email already exist', 400))
        }
        const user: IRegistrationBody = { name, email, password, avatar };
        const activationToken = createActivationToken(user);
        const activationCode=activationToken.activationCode;
        const data={user:{name:user.name},activationCode}
        const html=await ejs.renderFile(path.join(__dirname,'../mails/activation-mail.ejs'),data)
await sendEmail({
    email:user.email,
    subject:"Activate your account",
    template:"activation-mail.ejs",
    data
})
res.status(201).json({
    success:true,
    message:`Please check your mail: ${user.email} to activate your account`,
    activationToken
})

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400))

    }

}
)



//  ################################## Create Activation Token ####################################

export const createActivationToken = (user: IRegistrationBody): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret, {
        expiresIn: '5m'
    })
    return { activationCode, token }
}
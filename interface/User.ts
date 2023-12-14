import { Document } from "mongoose";

export interface  IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar:{
        public_id:string;
        url:string
    };
    role:string;
    isVerified:boolean;
    courses:Array<{courseId:string}>;
    comparePassword:(password:string)=>Promise<boolean>;
    SignAccessToken:()=>string;
    SignRefreshToken:()=>string;
}

export interface IRegistrationBody{
    name:string;
    email:string;
    password:string;
    avatar?:string;
}

export interface IActivationToken{
    token:string;
    activationCode:string;
}

export interface IActivateRequest{
    activation_token:string;
    activation_code:string;
}

export interface ILoginRequest{
    email:string;
    password:string;

}
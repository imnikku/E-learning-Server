import {Request} from 'express';
import { IUser } from './User.interface';
export interface IGetUserAuthInfoRequest extends Request{
    user?:IUser;
    
}
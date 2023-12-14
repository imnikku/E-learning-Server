import {Request} from 'express';
import { IUser } from './User';
export interface IGetUserAuthInfoRequest extends Request{
    user?:IUser;
    
}
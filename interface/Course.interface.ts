import { Document } from 'mongoose';


export interface IComment extends Document{
    user:Object;
    comment:string;
}
export interface IReview extends Document {
    user: Object;
    rating: number;
    comment: string;
    commentReplies:IComment[]

}
export interface ILink extends Document{
    title:string;
    url:string;
}

export interface ICourseData extends Document{
    title:string;
    description:string;
    videoUrl:string;
    videoThumbnail:Object;
    videoSection:string;
    videoLength:number;
    videoPlayer:string;
    links:ILink[];
    suggestion:string;
    questions:IComment[]
}

export interface ICourse extends Document{
    name:string;
    description:string;
    price:number;
    estimatedPrice?:number;
    thumbnail:Object;
    tags:string;
    level:string;
    demoUrl:string;
    benefits:{title:string}[];
    prerequisites:{title:string}[]; 
    reviews:IReview[];
    courseData:ICourseData[];
    ratings?:number;
    purchased?:number;
}
import express, { NextFunction, Request, Response } from 'express';
export const app=express()
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRoute from './routes/user.route';

// Add body parser and add limit 
app.use(express.json({limit:'50mb'}))

// Cookie parser 
app.use(cookieParser())

// Add cors policies ..........
app.use(cors({
    origin:process.env.ORIGIN||['http://localhost:3000']
}))



// route ................... 

app.use('/api/v1',userRoute)
// Test api ....
app.get('/',async(req:Request,res:Response,next:NextFunction)=>{

    try {
       res.status(200).json({
        success:true,
        message:'working fine'
       }) 
    } catch (error:any) {
        res.status(500).json({
            status:false,
            message:error.message
        })


        
    }


})


// Unknown route .....
app.all('*',(req:Request,res:Response,next:NextFunction)=>{
    const err=new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode=404
    next(err)
})



// Error Middleware .....
app.use(ErrorMiddleware)
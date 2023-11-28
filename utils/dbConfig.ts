import mongoose from "mongoose";
const connectDb=async()=>{
    try {
       const data= await mongoose.connect(process.env.DB_URL||"")
       console.log(`Database connected with ${data.connection.host} `)
        
    } catch (error:any) {
        console.log(error.message)
        setTimeout(() => {
            connectDb()
        }, 5000);
        
    }
}
export default connectDb
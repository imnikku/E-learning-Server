require('dotenv').config()  // Env File Configation on top of the file 
import {app} from './app'
import connectDb from './utils/DbConfig.utils'
import {v2 as cloudinary} from 'cloudinary'


// ################ Cloudinary config #########################
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY
})


// ###################### Create Server #######################
app.listen(process.env.PORT||8000,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
    connectDb()
})
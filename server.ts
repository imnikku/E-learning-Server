require('dotenv').config()  // Env File Configation on top of the file 
import {app} from './app'
import connectDb from './utils/dbConfig'



// create server .......


app.listen(process.env.PORT||8000,()=>{
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
    connectDb()
})
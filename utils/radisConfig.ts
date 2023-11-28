import Redis from "ioredis"
const radisClient=()=>{
    if(process.env.RADIS_URL){
        console.log('Radis Connected')
        return process.env.RADIS_URL
    }
    throw new  Error('Radis connection failed.')
}

export const radis=new Redis(radisClient())
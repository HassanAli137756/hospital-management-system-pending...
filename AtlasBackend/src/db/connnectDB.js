import mongoose from 'mongoose'
import {DB_NAME} from '../constansts.js'



const connectDB = async () =>
{
    
    try
    {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)

        console.log('Successfully connected with DB at host:', connectionInstance.connection.host);



        return connectionInstance
    }
    catch(err)
    {
        console.log("No connection", err);
        
    }
}



export {connectDB}